import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useUnreachedMapData } from '@/hooks/useUnreachedMapData';
import { ActivityIndicator } from 'react-native';

export default function PeopleGroupDetailPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { peopleGroups, isLoading } = useUnreachedMapData();

    const peopleGroup = peopleGroups.find((group) => group.PeopleID3ROG3 === id);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900">
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }

    if (!peopleGroup) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900 px-6">
                <Stack.Screen options={{ title: 'Not Found' }} />
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    People Group Not Found
                </Text>
                <TouchableOpacity
                    className="mt-4 bg-blue-600 px-6 py-3 rounded-lg"
                    onPress={() => router.back()}
                >
                    <Text className="text-white font-semibold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const openURL = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: peopleGroup.PeopNameInCountry,
                    headerBackTitle: 'Map'
                }}
            />
            <ScrollView className="flex-1 bg-white dark:bg-zinc-900">
                {/* Hero Image */}
                {peopleGroup.PeopleGroupPhotoURL && (
                    <Image
                        source={{ uri: peopleGroup.PeopleGroupPhotoURL }}
                        className="w-full h-64"
                        resizeMode="cover"
                    />
                )}

                <View className="p-6">
                    {/* Header */}
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {peopleGroup.PeopNameInCountry}
                    </Text>
                    <Text className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                        {peopleGroup.Ctry}
                        {peopleGroup.LocationInCountry && ` • ${peopleGroup.LocationInCountry}`}
                    </Text>

                    {/* Stats Grid */}
                    <View className="flex-row flex-wrap gap-3 mb-6">
                        <View className="flex-1 min-w-[45%] bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Population</Text>
                            <Text className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                {formatNumber(peopleGroup.Population)}
                            </Text>
                        </View>

                        <View className="flex-1 min-w-[45%] bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</Text>
                            <Text className="text-2xl font-bold text-red-900 dark:text-red-100">
                                {peopleGroup.JPScaleText}
                            </Text>
                        </View>

                        <View className="flex-1 min-w-[45%] bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Evangelical</Text>
                            <Text className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                {peopleGroup.PercentEvangelical}%
                            </Text>
                        </View>

                        <View className="flex-1 min-w-[45%] bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Countries</Text>
                            <Text className="text-2xl font-bold text-green-900 dark:text-green-100">
                                {peopleGroup.CountOfCountries}
                            </Text>
                        </View>
                    </View>

                    {/* Badges */}
                    <View className="flex-row flex-wrap gap-2 mb-6">
                        {peopleGroup.Frontier === 'Y' && (
                            <View className="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                                <Text className="text-red-800 dark:text-red-200 font-semibold">Frontier</Text>
                            </View>
                        )}
                        {peopleGroup.Window1040 === 'Y' && (
                            <View className="bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                                <Text className="text-orange-800 dark:text-orange-200 font-semibold">10/40 Window</Text>
                            </View>
                        )}
                        {peopleGroup.Nomadic === 'Y' && (
                            <View className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                <Text className="text-blue-800 dark:text-blue-200 font-semibold">
                                    {peopleGroup.NomadicTypeDescription || 'Nomadic'}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Summary */}
                    {peopleGroup.Summary && (
                        <View className="mb-6">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">About</Text>
                            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
                                {peopleGroup.Summary}
                            </Text>
                        </View>
                    )}

                    {/* Religion & Language Section */}
                    <View className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            Religion & Language
                        </Text>

                        <View className="mb-3">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Primary Religion</Text>
                            <Text className="text-base font-semibold text-gray-900 dark:text-white">
                                {peopleGroup.PrimaryReligion}
                                {peopleGroup.ReligionSubdivision && ` (${peopleGroup.ReligionSubdivision})`}
                            </Text>
                        </View>

                        <View className="mb-3">
                            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Primary Language</Text>
                            <Text className="text-base font-semibold text-gray-900 dark:text-white">
                                {peopleGroup.PrimaryLanguageName}
                            </Text>
                        </View>

                        <View className="flex-row gap-2 mt-2">
                            {peopleGroup.HasJesusFilm === 'Y' && (
                                <View className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded">
                                    <Text className="text-green-800 dark:text-green-200 text-sm">Jesus Film Available</Text>
                                </View>
                            )}
                            {peopleGroup.HasAudioRecordings === 'Y' && (
                                <View className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded">
                                    <Text className="text-blue-800 dark:text-blue-200 text-sm">Audio Resources</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* How to Reach */}
                    {peopleGroup.HowReach && (
                        <View className="mb-6">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                How to Reach Them
                            </Text>
                            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
                                {peopleGroup.HowReach}
                            </Text>
                        </View>
                    )}

                    {/* Obstacles */}
                    {peopleGroup.Obstacles && (
                        <View className="mb-6">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Obstacles
                            </Text>
                            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
                                {peopleGroup.Obstacles}
                            </Text>
                        </View>
                    )}

                    {/* Prayer Points */}
                    {peopleGroup.PrayForPG && (
                        <View className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                            <Text className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                                Prayer Points
                            </Text>
                            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
                                {peopleGroup.PrayForPG}
                            </Text>
                        </View>
                    )}

                    {/* Resources */}
                    {peopleGroup.Resources && peopleGroup.Resources.length > 0 && (
                        <View className="mb-6">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Resources
                            </Text>
                            {peopleGroup.Resources.map((resource, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 mb-2"
                                    onPress={() => openURL(resource.URL)}
                                >
                                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        {resource.Category}
                                    </Text>
                                    <Text className="text-base font-semibold text-blue-600 dark:text-blue-400">
                                        {resource.WebText}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* External Link */}
                    <TouchableOpacity
                        className="bg-blue-600 rounded-lg py-4 items-center mb-6"
                        onPress={() => openURL(peopleGroup.PeopleGroupURL)}
                    >
                        <Text className="text-white font-semibold text-lg">
                            View on Joshua Project
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}
