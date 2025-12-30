import axios from 'axios';

const JOSHUA_API_URL = process.env.EXPO_PUBLIC_JOSHUA_API_URL;
const JOSHUA_API_KEY = process.env.EXPO_PUBLIC_JOSHUA_API_KEY;

// Fetch data from Joshua Project API
export const fetchJoshuaData = async () => {
  try {
    const response = await axios.get(`${JOSHUA_API_URL}/countries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Joshua Project API:', error);
    throw error;
  }
};

// Fetch people groups from Joshua Project API
export const fetchPeopleGroups = async () => {
  try {
    const response = await axios.get(`${JOSHUA_API_URL}/people_groups.json`, {
      params: {
        api_key: JOSHUA_API_KEY,
        limit: 3000,
      },
    });
    
    // Filter out entries without valid coordinates
    const peopleGroups = response.data || [];
    const validPeopleGroups = peopleGroups.filter(
      (group) => group.Latitude != null && group.Longitude != null
    );
    
    return validPeopleGroups;
  } catch (error) {
    console.error('Error fetching people groups from Joshua Project API:', error);
    throw error;
  }
};
