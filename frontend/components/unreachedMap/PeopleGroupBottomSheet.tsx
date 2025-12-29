import React, { forwardRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { PeopleGroup } from '@/types/peopleGroup';
import { useRouter } from 'expo-router';

interface PeopleGroupBottomSheetProps {
    peopleGroup: PeopleGroup | null;
    onClose: () => void;
}

export const PeopleGroupBottomSheet = forwardRef<BottomSheet, PeopleGroupBottomSheetProps>(
    ({ peopleGroup, onClose }, ref) => {
        const router = useRouter();
        const colorScheme = useColorScheme();
        const snapPoints = useMemo(() => ['40%', '70%'], []);

        if (!peopleGroup) return null;

        const handleSeeMore = () => {
            router.push(`/unreached/${peopleGroup.PeopleID3ROG3}` as any);
            onClose();
        };

        // Format population with commas
        const formatNumber = (num: number) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };

        return (
            <BottomSheet
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={onClose}
                backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#18181b' : '#fff' }}
                handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#52525b' : '#D1D5DB' }}
            >
                <BottomSheetScrollView className="flex-1 px-4">
                    {/* Header with photo */}
                    {peopleGroup.PeopleGroupPhotoURL && (
                        <Image
                            source={{ uri: peopleGroup.PeopleGroupPhotoURL }}
                            className="w-full h-48 rounded-lg mb-4"
                            resizeMode="cover"
                        />
                    )}

                    {/* People Group Name */}
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {peopleGroup.PeopNameInCountry}
                    </Text>

                    {/* Country and Location */}
                    <Text className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {peopleGroup.Ctry}
                        {peopleGroup.LocationInCountry && ` • ${peopleGroup.LocationInCountry}`}
                    </Text>

                    {/* Key Stats Cards */}
                    <View className="flex-row gap-2 mb-4">
                        {/* Population Card */}
                        <View className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <Text className="text-xs text-gray-600 dark:text-gray-400 mb-1">Population</Text>
                            <Text className="text-lg font-bold text-blue-900 dark:text-blue-100">
                                {formatNumber(peopleGroup.Population)}
                            </Text>
                        </View>

                        {/* JPScale Card */}
                        <View className="flex-1 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                            <Text className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</Text>
                            <Text className="text-lg font-bold text-red-900 dark:text-red-100">
                                {peopleGroup.JPScaleText}
                            </Text>
                        </View>
                    </View>

                    {/* Religion & Evangelical % */}
                    <View className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 mb-4">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Primary Religion</Text>
                            <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                                {peopleGroup.PrimaryReligion}
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Evangelical</Text>
                            <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                                {peopleGroup.PercentEvangelical}%
                            </Text>
                        </View>
                    </View>

                    {/* Language & Bible Status */}
                    <View className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 mb-4">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Primary Language</Text>
                            <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                                {peopleGroup.PrimaryLanguageName}
                            </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Bible Available</Text>
                            <View className="flex-row gap-2">
                                {peopleGroup.HasJesusFilm === 'Y' && (
                                    <Text className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                        Jesus Film
                                    </Text>
                                )}
                                {peopleGroup.HasAudioRecordings === 'Y' && (
                                    <Text className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                        Audio
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Summary */}
                    {peopleGroup.Summary && (
                        <View className="mb-4">
                            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
                                {peopleGroup.Summary}
                            </Text>
                        </View>
                    )}

                    {/* Action Buttons */}
                    <View className="flex-row gap-3 mb-6">
                        <TouchableOpacity
                            className="flex-1 bg-blue-600 dark:bg-blue-500 rounded-lg py-3 items-center"
                            onPress={handleSeeMore}
                        >
                            <Text className="text-white font-semibold">See More Details</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 bg-gray-200 dark:bg-zinc-700 rounded-lg py-3 items-center"
                            onPress={onClose}
                        >
                            <Text className="text-gray-700 dark:text-gray-200 font-semibold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        );
    }
);

PeopleGroupBottomSheet.displayName = 'PeopleGroupBottomSheet';
