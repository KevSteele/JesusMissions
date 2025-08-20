import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
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
                style={[
                    styles.episodeCard,
                    isSelected && styles.selectedCard
                ]}
                onPress={() => onEpisodeSelect(item)}
            >
                <View style={[styles.cardContent, isSelected && styles.selectedContent]}>
                    <View style={styles.episodeHeader}>
                        <Text style={styles.episodeNumber}>Episode {item.episodeNumber}</Text>
                        <Text style={styles.duration}>{item.duration || 'No duration'}</Text>
                    </View>

                    <Text style={styles.episodeTitle}>{item.title || 'Untitled Episode'}</Text>

                    {item.description && item.description.trim() && (
                        <Text style={styles.episodeDescription} numberOfLines={3}>
                            {item.description.replace(/<[^>]*>/g, '').trim() || 'No description available'} {/* Strip HTML */}
                        </Text>
                    )}

                    <View style={styles.episodeFooter}>
                        <Text style={styles.publishDate}>{formatDate(item.publishedDate)}</Text>
                        <Text style={styles.creator}>by {item.creator || 'Unknown'}</Text>
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
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    episodeCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        overflow: 'hidden',
    },
    selectedCard: {
        borderColor: '#007AFF',
        borderWidth: 2,
    },
    cardContent: {
        padding: 16,
    },
    selectedContent: {
        backgroundColor: '#f0f8ff',
    },
    episodeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    episodeNumber: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
    },
    duration: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    episodeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        lineHeight: 24,
    },
    episodeDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
        marginBottom: 12,
    },
    episodeFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    publishDate: {
        fontSize: 12,
        color: '#999',
    },
    creator: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    separator: {
        height: 12,
    },
});