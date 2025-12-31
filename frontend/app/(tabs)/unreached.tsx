import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PeopleGroupBottomSheet } from '@/components/unreachedMap/PeopleGroupBottomSheet';
import {
  useUnreachedMapData,
  useLegendControl,
  useBottomSheetControl,
} from '@/hooks/unreachedMap';
import {
  MARKER_COLORS,
  getMarkerColorForPeopleGroup,
  calculateClusterColor,
  isValidPeopleGroupForMap,
} from '@/services/unreachedMap';
import { PeopleGroup } from '@/types/peopleGroup';

// Conditional imports for native-only modules
let PROVIDER_GOOGLE: any;
let Marker: any;
let ClusteredMapView: any;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  const { default: ClusterMap, Marker: ClusterMarker } = require('react-native-map-clustering');
  
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  ClusteredMapView = ClusterMap;
  // Always use the Marker from react-native-maps (clustering lib uses it internally)
  Marker = Maps.Marker;
}

export default function UnreachedScreen() {
  // Web fallback
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-zinc-900 p-6">
        <View className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg max-w-md">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Map View Not Available
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
            The interactive map feature is only available on iOS and Android. Please use the mobile app to explore unreached people groups on the map.
          </Text>
        </View>
      </View>
    );
  }

  // Data and state hooks
  const { peopleGroups, isLoading } = useUnreachedMapData();
  const { legendVisible, slideAnimation, setContentWidth, toggleLegend } = useLegendControl();
  const {
    bottomSheetRef,
    selectedPeopleGroup,
    handleMarkerPress,
    handleCloseBottomSheet,
  } = useBottomSheetControl();
  
  // Cluster rendering logic
  const renderCluster = useCallback((cluster: any) => {
    // Safety check: ensure we have data
    if (!peopleGroups || peopleGroups.length === 0) {
      return null;
    }

    const { id, geometry, onPress, properties } = cluster;
    const pointCount = properties?.point_count || 0;
    
    if (!geometry?.coordinates || geometry.coordinates.length < 2) {
      return null;
    }
    
    const [longitude, latitude] = geometry.coordinates;

    // Calculate cluster color based on nearby groups
    const clusterColor = calculateClusterColor(latitude, longitude, peopleGroups);

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude,
          longitude,
        }}
        onPress={onPress}renderIndividualMarker
        tracksViewChanges={false}
      >
        <View
          className="w-[50px] h-[50px] rounded-full justify-center items-center border-[3px] border-white"
          style={{ backgroundColor: clusterColor }}
        >
          <Text className="text-white text-base font-bold">
            {pointCount}
          </Text>
        </View>
      </Marker>
    );
  }, [peopleGroups]);

  // Individual marker rendering
  const renderIndividualMarker = useCallback((peopleGroup: PeopleGroup) => {
    // Skip invalid markers
    if (!isValidPeopleGroupForMap(peopleGroup)) {
      return null;
    }

    const markerColor = getMarkerColorForPeopleGroup(peopleGroup);

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
          style={{ backgroundColor: markerColor }}
        />
      </Marker>
    );
  }, [handleMarkerPress]);

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
          {peopleGroups.map(renderIndividualMarker)}
        </ClusteredMapView>

        {/* Legend overlay */}
        <Animated.View 
          className="absolute top-4 left-0 flex-row"
          style={{ transform: [{ translateX: slideAnimation }] }}
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
                  <View 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: MARKER_COLORS.UNREACHED }}
                  />
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Unreached</Text>
                </View>
                <View className="flex-row items-center">
                  <View 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: MARKER_COLORS.MINIMAL }}
                  />
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Minimal</Text>
                </View>
                <View className="flex-row items-center">
                  <View 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: MARKER_COLORS.REACHED }}
                  />
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Reached</Text>
                </View>
              </View>
            </View>

            {/* Toggle button */}
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


