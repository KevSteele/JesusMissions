import React, { useRef, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUnreachedMapData } from '@/hooks/useUnreachedMapData';
import { PeopleGroupBottomSheet } from '@/components/unreachedMap/PeopleGroupBottomSheet';
import { PeopleGroup } from '@/types/peopleGroup';

export default function UnreachedScreen() {
  const { peopleGroups, isLoading } = useUnreachedMapData();
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
    if (!peopleGroup) return;
    setSelectedPeopleGroup(peopleGroup);
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedPeopleGroup(null);
  }, []);

  // Calculate cluster color based on nearby groups in same region/state/country
  const renderCluster = useCallback((cluster: any) => {
    // Safety check: ensure we have data
    if (!peopleGroups || peopleGroups.length === 0) {
      return null;
    }

    const { id, geometry, onPress, properties } = cluster;
    const points = properties?.point_count || 0;
    
    if (!geometry?.coordinates || geometry.coordinates.length < 2) {
      return null;
    }
    
    const [longitude, latitude] = geometry.coordinates;

    // Find closest group to determine regional context
    let closestGroup = peopleGroups[0];
    let minDistance = Infinity;
    
    peopleGroups.forEach((group) => {
      // Skip groups with invalid coordinates
      if (!group || typeof group.Latitude !== 'number' || typeof group.Longitude !== 'number') {
        return;
      }
      
      const latDiff = Math.abs(group.Latitude - latitude);
      const lngDiff = Math.abs(group.Longitude - longitude);
      const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestGroup = group;
      }
    });

    // Safety check: ensure closestGroup has required properties
    if (!closestGroup || !closestGroup.ISO3) {
      return null;
    }

    // Filter groups by same administrative region
    // Priority: LocationInCountry (state/province) > Country (ISO3)
    const nearbyGroups = peopleGroups.filter((group) => {
      // Safety check for group properties
      if (!group || !group.ISO3) return false;
      
      // Must be same country
      if (group.ISO3 !== closestGroup.ISO3) return false;
      
      // If LocationInCountry exists (e.g., "Illinois"), use it for tighter clustering
      if (closestGroup.LocationInCountry && group.LocationInCountry) {
        return group.LocationInCountry === closestGroup.LocationInCountry;
      }
      
      // Otherwise, cluster by country (useful for small countries)
      return true;
    });

    // Calculate dominant JPScale in nearby groups
    const unreachedCount = nearbyGroups.filter(g => g && typeof g.JPScale === 'number' && g.JPScale <= 2).length;
    const minimalCount = nearbyGroups.filter(g => g && typeof g.JPScale === 'number' && g.JPScale === 3).length;
    const reachedCount = nearbyGroups.filter(g => g && typeof g.JPScale === 'number' && g.JPScale >= 4).length;
    
    // Use majority rule with proper tie handling
    let clusterColor = '#DC2626'; // Default red
    
    // Find which category has the most
    const maxCount = Math.max(unreachedCount, minimalCount, reachedCount);
    
    if (reachedCount === maxCount && reachedCount > 0) {
      clusterColor = '#16A34A'; // Green for reached majority
    } else if (minimalCount === maxCount && minimalCount > 0) {
      clusterColor = '#F97316'; // Orange for minimal majority
    } else if (unreachedCount === maxCount && unreachedCount > 0) {
      clusterColor = '#DC2626'; // Red for unreached majority
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
          className="w-[50px] h-[50px] rounded-full justify-center items-center border-[3px] border-white"
          style={{ backgroundColor: clusterColor }}
        >
          <Text className="text-white text-base font-bold">
            {points}
          </Text>
        </View>
      </Marker>
    );
  }, [peopleGroups]);

  return (
    <GestureHandlerRootView className="flex-1">
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
          {Array.isArray(peopleGroups) && peopleGroups.map((peopleGroup) => {
            // Skip invalid markers
            if (!peopleGroup || typeof peopleGroup.Latitude !== 'number' || typeof peopleGroup.Longitude !== 'number') {
              return null;
            }
            
            return (
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
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{
                  backgroundColor:
                    peopleGroup.JPScale <= 2
                      ? '#DC2626'
                      : peopleGroup.JPScale === 3
                      ? '#F97316'
                      : '#16A34A',
                }}
              />
            </Marker>
            );
          })}
        </ClusteredMapView>

        {/* Info overlay */}
        <Animated.View 
          className="absolute top-4 left-0 flex-row"
          style={{ transform: [{ translateX: slideAnim }] }}
        >
          <View className="bg-white dark:bg-zinc-800 shadow-lg flex-row overflow-hidden rounded-r-xl">
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
              className="bg-gray-100 dark:bg-zinc-700 px-3 justify-center items-center self-stretch"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 dark:text-gray-300 text-lg">
                {legendVisible ? '◀' : '▶'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Loading Indicator Overlay */}
        {isLoading && (
          <View className="absolute inset-0 justify-center items-center bg-black/30 dark:bg-black/50">
            <View className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-gray-900 dark:text-white mt-3 font-semibold">
                Loading People Groups...
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Fetching data from Joshua Project
              </Text>
            </View>
          </View>
        )}

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


