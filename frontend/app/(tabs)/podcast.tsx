import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcastEpisodes } from '@/api/rss';
import { PodcastEpisode } from '@/types/podcast';
import PodcastEpisodeList from '@/components/PodcastEpisodeList';
import { useState } from 'react';
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jesus Missions Podcast</Text>
      </View>

      {/* Audio Player for Selected Episode */}
      {selectedEpisode && (
        <View style={styles.playerSection}>
          <AudioPlayer
            audioUrl={selectedEpisode.audioUrl}
            title={selectedEpisode.title}
            artist={selectedEpisode.creator}
            onPlaybackChange={() => {}}
          />
        </View>
      )}

      {isLoading && <Text>Loading episodes...</Text>}

      {error && <Text>Error: {error.message}</Text>}

      {episodes && episodes.length > 0 && (
        <View style={styles.episodeListSection}>
          <Text style={styles.sectionTitle}>Episodes</Text>
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
        <Text>No episodes found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  playerSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  episodeListSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingBottom: 10,
    color: '#333',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
