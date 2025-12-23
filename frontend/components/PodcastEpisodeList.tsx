import React, { useState } from 'react';
import { FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, View } from 'react-native';
import { PodcastEpisode } from '@/types/podcast';

interface PodcastEpisodeListProps {
    episodes: PodcastEpisode[];
    selectedEpisode?: PodcastEpisode | null;
    onEpisodeSelect: (episode: PodcastEpisode) => void;
    onRefresh?: () => void;
    isRefreshing?: boolean;
}

export default function PodcastEpisodeList({
    episodes,
    selectedEpisode,
    onEpisodeSelect,
    onRefresh,
    isRefreshing = false
}: PodcastEpisodeListProps) {
    const [expandedEpisodeId, setExpandedEpisodeId] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        if (!dateString || dateString.trim() === '') {
            return 'Unknown date';
        }
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Unknown date';
            }
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return 'Unknown date';
        }
    };

    const renderEpisode = ({ item }: { item: PodcastEpisode }) => {
        const isSelected = selectedEpisode?.id === item.id;
        const isExpanded = expandedEpisodeId === item.id;

        return (
            <View
                className={`rounded-xl border overflow-hidden ${isSelected ? 'border-blue-600 border-2 bg-white dark:bg-zinc-800' : 'border-gray-200 bg-white/50 dark:bg-zinc-800/50'}`}
            >
                <View className={`p-3 rounded-xl shadow-sm transition-all duration-150 ${isSelected ? 'bg-white dark:bg-zinc-900' : 'bg-white/50 dark:bg-zinc-900/50'}`}>
                    <View className="flex-row gap-3">
                        {/* Play Button - Left Side (clickable area) */}
                        <TouchableOpacity
                            onPress={() => onEpisodeSelect(item)}
                            className="justify-center"
                            activeOpacity={0.7}
                        >
                            <View className="bg-blue-600 rounded-full w-14 h-14 items-center justify-center shadow-lg">
                                <Text className="text-white text-2xl font-bold" style={{ marginLeft: 2 }}>▶</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Episode Details - Right Side (clickable area for expand) */}
                        <TouchableOpacity
                            className="flex-1"
                            onPress={() => setExpandedEpisodeId(isExpanded ? null : item.id)}
                            activeOpacity={0.95}
                        >
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                                    Episode {item.episodeNumber}
                                </Text>
                                <Text className="text-xs font-medium text-gray-500 dark:text-gray-300">
                                    {item.duration || 'No duration'}
                                </Text>
                            </View>

                            <Text className="text-lg font-bold mb-2 leading-6 text-zinc-900 dark:text-white">
                                {item.title || 'Untitled Episode'}
                            </Text>

                            {isExpanded && item.description && item.description.trim() && (
                                <Text className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                                    {item.description.replace(/<[^>]*>/g, '').trim() || 'No description available'}
                                </Text>
                            )}

                            <View className="flex-row justify-between items-center">
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-xs text-gray-500 dark:text-gray-300">
                                        {formatDate(item.publishedDate)}
                                    </Text>
                                    <Text className="text-xs italic text-gray-500 dark:text-gray-300">
                                        by {item.creator || 'Unknown'}
                                    </Text>
                                </View>
                                
                                {item.description && item.description.trim() && (
                                    <View className="px-2 py-1">
                                        <Text className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                            {isExpanded ? '▲ Less' : '▼ More'}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={episodes}
            renderItem={renderEpisode}
            keyExtractor={(item) => item.id}
            contentContainerClassName="p-4"
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-3" />}
            refreshControl={
                onRefresh ? (
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor="#007AFF"
                        title="Pull to refresh episodes"
                        titleColor="#007AFF"
                    />
                ) : undefined
            }
        />
    );
}