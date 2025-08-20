import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcastEpisodes } from '@/api/rss';
import { PodcastEpisode } from '@/types/podcast';
import PodcastEpisodeList from '@/components/PodcastEpisodeList';
import { useState } from 'react';

export default function PodcastScreen() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['podcast-episodes'],
    queryFn: fetchPodcastEpisodes,
  });

  // Auto-select first episode (latest) when episodes load but don't auto-play
  React.useEffect(() => {
    if (episodes && episodes.length > 0 && !selectedEpisode) {
      setSelectedEpisode(episodes[0]); // First episode (most recent)
    }
  }, [episodes, selectedEpisode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jesus Missions Podcast</Text>

      {isLoading && <Text>Loading episodes...</Text>}

      {error && <Text>Error: {error.message}</Text>}

      {episodes && episodes.length > 0 && (
        <PodcastEpisodeList
          episodes={episodes}
          selectedEpisode={selectedEpisode}
          onEpisodeSelect={setSelectedEpisode}
        />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
