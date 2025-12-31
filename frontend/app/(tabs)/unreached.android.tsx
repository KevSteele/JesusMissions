import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
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
    isValidPeopleGroupForMap,
} from '@/services/unreachedMap';
import { PeopleGroup } from '@/types/peopleGroup';
import { UnreachedMapViewProps } from '@/components/unreachedMap/MapViewProps';

// Android-specific imports
const Maps = require('react-native-maps');
const MapView = Maps.default;
const Marker = Maps.Marker;
const PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;

// 10/40 Window: Centered over the region with the highest concentration of unreached people groups
const DEFAULT_INITIAL_REGION = {
    latitude: 25,
    longitude: 50,
    latitudeDelta: 60,
    longitudeDelta: 90,
};

/**
 * Android Map Implementation - Black Box Component
 * Accepts standard props and renders map optimized for Android
 */
function AndroidMapView({
    peopleGroups,
    isLoading,
    onMarkerPress,
    initialRegion = DEFAULT_INITIAL_REGION
}: UnreachedMapViewProps) {
    const mapReference = useRef<any>(null);

    // Force the map to zoom to initial region after it loads
    useEffect(() => {
        if (mapReference.current && !isLoading && peopleGroups.length > 0) {
            setTimeout(() => {
                mapReference.current?.animateToRegion(initialRegion, 100);
            }, 500);
        }
    }, [isLoading, peopleGroups.length, initialRegion]);

    return (
        <MapView
            ref={mapReference}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            initialRegion={initialRegion}
            showsUserLocation={false}
            showsMyLocationButton={false}
        >
            {peopleGroups.map((peopleGroup) => {
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
                        onPress={() => onMarkerPress(peopleGroup)}
                        pinColor={markerColor}
                    />
                );
            })}
        </MapView>
    );
}

export default function UnreachedScreen() {
    // Data and state hooks - these provide data to the black box map
    const { peopleGroups, isLoading } = useUnreachedMapData();
    const { legendVisible, slideAnimation, setContentWidth, toggleLegend } = useLegendControl();
    const {
        bottomSheetRef,
        selectedPeopleGroup,
        handleMarkerPress,
        handleCloseBottomSheet,
    } = useBottomSheetControl();

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                {/* Black box map component - receives data, renders markers */}
                <AndroidMapView
                    peopleGroups={peopleGroups}
                    isLoading={isLoading}
                    onMarkerPress={handleMarkerPress}
                    initialRegion={DEFAULT_INITIAL_REGION}
                />

                {/* Legend overlay */}
                <Animated.View
                    style={[
                        styles.legendContainer,
                        { transform: [{ translateX: slideAnimation }] }
                    ]}
                >
                    <View style={styles.legendContent}>
                        <View
                            style={styles.legendInner}
                            onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
                        >
                            <Text style={styles.legendTitle}>
                                Unreached People Groups
                            </Text>

                            {/* Legend */}
                            <View style={styles.legendItems}>
                                <View style={styles.legendItem}>
                                    <View
                                        style={[styles.legendDot, { backgroundColor: MARKER_COLORS.UNREACHED }]}
                                    />
                                    <Text style={styles.legendText}>Unreached</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View
                                        style={[styles.legendDot, { backgroundColor: MARKER_COLORS.MINIMAL }]}
                                    />
                                    <Text style={styles.legendText}>Minimal</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View
                                        style={[styles.legendDot, { backgroundColor: MARKER_COLORS.REACHED }]}
                                    />
                                    <Text style={styles.legendText}>Reached</Text>
                                </View>
                            </View>
                        </View>

                        {/* Toggle button */}
                        <TouchableOpacity
                            onPress={toggleLegend}
                            style={styles.toggleButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.toggleText}>
                                {legendVisible ? '◀' : '▶'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Loading Indicator Overlay */}
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingCard}>
                            <ActivityIndicator size="large" color="#3B82F6" />
                            <Text style={styles.loadingTitle}>
                                Loading People Groups...
                            </Text>
                            <Text style={styles.loadingSubtitle}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    legendContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        flexDirection: 'row',
    },
    legendContent: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        overflow: 'hidden',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        elevation: 8,
    },
    legendInner: {
        padding: 16,
    },
    legendTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    legendItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 4,
    },
    legendText: {
        fontSize: 12,
        color: '#374151',
    },
    toggleButton: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleText: {
        color: '#374151',
        fontSize: 18,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    loadingCard: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        elevation: 8,
        alignItems: 'center',
    },
    loadingTitle: {
        color: '#111827',
        marginTop: 12,
        fontWeight: '600',
        fontSize: 16,
    },
    loadingSubtitle: {
        color: '#6B7280',
        fontSize: 14,
        marginTop: 4,
    },
});
