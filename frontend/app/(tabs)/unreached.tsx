import React, { useRef, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUnreachedMapData } from '@/hooks/useUnreachedMapData';
import { PeopleGroupBottomSheet } from '@/components/unreachedMap/PeopleGroupBottomSheet';
import { PeopleGroup } from '@/types/peopleGroup';

export default function UnreachedScreen() {
  const { peopleGroups } = useUnreachedMapData();
  const [selectedPeopleGroup, setSelectedPeopleGroup] = useState<PeopleGroup | null>(null);
  const [legendVisible, setLegendVisible] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const toggleLegend = useCallback(() => {
    // Slide by content width so only toggle button remains visible
    const toValue = legendVisible ? -contentWidth : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setLegendVisible(!legendVisible);
  }, [legendVisible, slideAnim, contentWidth]);

  const handleMarkerPress = useCallback((peopleGroup: PeopleGroup) => {
    setSelectedPeopleGroup(peopleGroup);
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedPeopleGroup(null);
  }, []);

  // Calculate cluster color based on nearby groups
  const renderCluster = useCallback((cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    const [longitude, latitude] = geometry.coordinates;

    // Find groups within ~0.5 degree radius of cluster center
    const nearbyGroups = peopleGroups.filter((group) => {
      const latDiff = Math.abs(group.Latitude - latitude);
      const lngDiff = Math.abs(group.Longitude - longitude);
      return latDiff < 0.5 && lngDiff < 0.5;
    });

    // Calculate dominant JPScale in nearby groups
    const unreachedCount = nearbyGroups.filter(g => g.JPScale <= 2).length;
    const minimalCount = nearbyGroups.filter(g => g.JPScale === 3).length;
    const reachedCount = nearbyGroups.filter(g => g.JPScale >= 4).length;
    
    let clusterColor = '#DC2626'; // Default red (unreached)
    if (reachedCount > unreachedCount && reachedCount > minimalCount) {
      clusterColor = '#16A34A'; // Green for mostly reached
    } else if (minimalCount > unreachedCount && minimalCount > reachedCount) {
      clusterColor = '#F97316'; // Orange for mostly minimal
    }

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude,
          longitude,
        }}
        onPress={onPress}
        tracksViewChanges={false}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: clusterColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: '#FFFFFF',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
            {points}
          </Text>
        </View>
      </Marker>
    );
  }, [peopleGroups]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
        <ClusteredMapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 20,
            longitude: 0,
            latitudeDelta: 80,
            longitudeDelta: 80,
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          rotateEnabled={true}
          pitchEnabled={true}
          radius={40}
          maxZoom={20}
          minZoom={1}
          extent={512}
          nodeSize={64}
          renderCluster={renderCluster}
        >
          {peopleGroups.map((peopleGroup) => (
            <Marker
              key={peopleGroup.PeopleID3ROG3}
              coordinate={{
                latitude: peopleGroup.Latitude,
                longitude: peopleGroup.Longitude,
              }}
              onPress={() => handleMarkerPress(peopleGroup)}
              tracksViewChanges={false}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor:
                    peopleGroup.JPScale <= 2
                      ? '#DC2626'
                      : peopleGroup.JPScale === 3
                      ? '#F97316'
                      : '#16A34A',
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                }}
              />
            </Marker>
          ))}
        </ClusteredMapView>

        {/* Info overlay */}
        <Animated.View 
          style={{
            position: 'absolute',
            top: 16,
            left: 0,
            transform: [{ translateX: slideAnim }],
            flexDirection: 'row',
          }}
        >
          <View className="bg-white dark:bg-zinc-800 shadow-lg flex-row overflow-hidden" style={{ borderTopRightRadius: 12, borderBottomRightRadius: 12 }}>
            <View 
              className="p-4"
              onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
            >
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Unreached People Groups
              </Text>

              {/* Legend */}
              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-red-600 mr-1" />
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Unreached</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-orange-500 mr-1" />
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Minimal</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-green-600 mr-1" />
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Reached</Text>
                </View>
              </View>
            </View>

            {/* Toggle button - part of same container */}
            <TouchableOpacity
              onPress={toggleLegend}
              className="bg-gray-100 dark:bg-zinc-700 px-3 justify-center items-center"
              activeOpacity={0.7}
              style={{ alignSelf: 'stretch' }}
            >
              <Text className="text-gray-700 dark:text-gray-300 text-lg">
                {legendVisible ? '◀' : '▶'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bottom Sheet */}
        {selectedPeopleGroup && (
          <PeopleGroupBottomSheet
            ref={bottomSheetRef}
            peopleGroup={selectedPeopleGroup}
            onClose={handleCloseBottomSheet}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}


