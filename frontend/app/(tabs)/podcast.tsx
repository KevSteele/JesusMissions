import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcastEpisodes } from '@/api/rss';
import { PodcastEpisode } from '@/types/podcast';
import PodcastEpisodeList from '@/components/PodcastEpisodeList';
import AudioPlayer from '@/components/AudioPlayer';

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
  <View className="flex-1 bg-white dark:bg-zinc-900">
      <View className="px-5 pb-2 items-center">
        <Text className="text-2xl font-bold text-black dark:text-white">Jesus Missions Podcast</Text>
      </View>

      {/* Audio Player for Selected Episode */}
      {selectedEpisode && (
        <View className="px-5 pb-5">
          <AudioPlayer
            audioUrl={selectedEpisode.audioUrl}
            title={selectedEpisode.title}
            artist={selectedEpisode.creator}
            onPlaybackChange={() => { }}
          />
        </View>
      )}

      {isLoading && <Text className="text-zinc-900 dark:text-white">Loading episodes...</Text>}

      {error && <Text className="text-red-600 dark:text-red-400">Error: {error.message}</Text>}

      {episodes && episodes.length > 0 && (
        <View className="flex-1">
          <Text className="text-lg font-semibold px-5 pb-2 text-zinc-900 dark:text-white">
            Episodes
          </Text>
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
        <Text className="text-zinc-900 dark:text-white">No episodes found.</Text>
      )}
    </View>
  );
}
