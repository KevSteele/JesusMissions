import React, { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcastEpisodes } from '@/api/rss';
import { PodcastEpisode } from '@/types/podcast';
import PodcastEpisodeList from '@/components/PodcastEpisodeList';
import AudioPlayer from '@/components/AudioPlayer';
import mountainBackground from '@/assets/images/mountainBackground.jpg';

export default function PodcastScreen() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  const { data: episodes, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['podcast-episodes'],
    queryFn: fetchPodcastEpisodes,
    staleTime: 1000 * 60 * 60 * 12, // 12 hours - matches the prefetch setting
  });

  // Auto-select first episode (latest) when episodes load but don't auto-play
  React.useEffect(() => {
    if (episodes && episodes.length > 0 && !selectedEpisode) {
      setSelectedEpisode(episodes[0]); // First episode (most recent)
    }
  }, [episodes, selectedEpisode]);

  return (
    <ImageBackground source={mountainBackground} className="flex-1" resizeMode="cover">
      <View className="flex-1 bg-white/30 dark:bg-zinc-900/30">
        {/* Compact Header */}
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-white text-center">
            Podcast
          </Text>
        </View>

        {/* Audio Player for Selected Episode */}
        {selectedEpisode && (
          <View className="px-4 pb-3">
            <AudioPlayer
              audioUrl={selectedEpisode.audioUrl}
              title={selectedEpisode.title}
              artist={selectedEpisode.creator}
              onPlaybackChange={() => { }}
            />
          </View>
        )}

        {isLoading && (
          <View className="px-6">
            <Text className="text-white text-center">Loading episodes...</Text>
          </View>
        )}

        {error && (
          <View className="px-6">
            <Text className="text-red-400 text-center">Error: {error.message}</Text>
          </View>
        )}

        {episodes && episodes.length > 0 && (
          <View className="flex-1">
            <PodcastEpisodeList
              episodes={episodes}
              selectedEpisode={selectedEpisode}
              onEpisodeSelect={setSelectedEpisode}
              onRefresh={refetch}
              isRefreshing={isFetching}
            />
          </View>
        )}

        {episodes && episodes.length === 0 && (
          <View className="px-6">
            <Text className="text-white text-center">No episodes found.</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
