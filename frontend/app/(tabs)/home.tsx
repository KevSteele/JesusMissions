// app/tabs/VideoScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchStrapiData } from '../../api/api'; // Ensure the import path is correct

const VideoScreen = () => {
  // Correct use of useQuery with an object
  const { data, error, isLoading } = useQuery({
    queryKey: ['videos'],  // Set the key to identify the query
    queryFn: fetchStrapiData, // Set the function that fetches the data
  });

  // Render loading, error, or data states
  if (isLoading) return <Text>Loading videos...</Text>;
  if (error) return <Text>Error loading videos</Text>;

  return (
    <View>
      <FlatList
        data={data.data} // Adjust based on Strapi's response structure
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.attributes.title}</Text>
            <Text>{item.attributes.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default VideoScreen;
