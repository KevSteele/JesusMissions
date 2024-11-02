import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query'; // Ensure React Query is installed
import { fetchStrapiData } from '@/api/api'; // Corrected import path and function name

export default function TabOneScreen() {
  // Fetch data from Strapi using React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ['videos'], // Correct use of queryKey
    queryFn: fetchStrapiData, // Ensure this matches the correct function
  });

  // Render loading, error, or data states
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* Display fetched data from Strapi */}
      <FlatList
        data={data.data} // Adjust based on the response structure from Strapi
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.attributes.title}</Text>
            <Text style={styles.itemDescription}>{item.attributes.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  itemContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '90%',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});
