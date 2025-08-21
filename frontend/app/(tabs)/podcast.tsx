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
    <View className="flex-1 bg-background dark:bg-background-dark">
      <View className="px-5 pb-2 items-center">
        <Text className="text-2xl font-bold text-primary dark:text-primary-dark">Jesus Missions Podcast</Text>
      </View>

      {/* Audio Player for Selected Episode */}
      {selectedEpisode && (
  <View className="px-5 pb-5">
          <AudioPlayer
            audioUrl={selectedEpisode.audioUrl}
            title={selectedEpisode.title}
            artist={selectedEpisode.creator}
            onPlaybackChange={() => {}}
          />
        </View>
      )}


  {isLoading && <Text className="text-primary dark:text-primary-dark">Loading episodes...</Text>}

  {error && <Text className="text-error dark:text-error-dark">Error: {error.message}</Text>}

      {episodes && episodes.length > 0 && (
        <View className="flex-1">
          <Text className="text-lg font-semibold px-5 pb-2 text-primary dark:text-primary-dark">
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
        <Text className="text-primary dark:text-primary-dark">No episodes found.</Text>
      )}
    </View>
  );
}
