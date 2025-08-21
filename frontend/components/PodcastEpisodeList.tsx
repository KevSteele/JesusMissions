import React from 'react';
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

        return (
            <TouchableOpacity
                className={`rounded-xl border overflow-hidden ${isSelected ? 'border-blue-500 border-2 bg-blue-50' : 'border-gray-200'} mb-3`}
                onPress={() => onEpisodeSelect(item)}
            >
                <View className={`p-4 ${isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-background dark:bg-background-dark'}`}>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-xs font-semibold uppercase text-muted dark:text-muted-dark">
                            Episode {item.episodeNumber}
                        </Text>
                        <Text className="text-xs font-medium text-muted dark:text-muted-dark">
                            {item.duration || 'No duration'}
                        </Text>
                    </View>

                    <Text className="text-lg font-bold mb-2 leading-6 text-primary dark:text-primary-dark">
                        {item.title || 'Untitled Episode'}
                    </Text>

                    {item.description && item.description.trim() && (
                        <Text className="text-sm text-muted dark:text-muted-dark mb-3" numberOfLines={3}>
                            {item.description.replace(/<[^>]*>/g, '').trim() || 'No description available'}
                        </Text>
                    )}

                    <View className="flex-row justify-between items-center">
                        <Text className="text-xs text-muted dark:text-muted-dark">
                            {formatDate(item.publishedDate)}
                        </Text>
                        <Text className="text-xs italic text-muted dark:text-muted-dark">
                            by {item.creator || 'Unknown'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
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