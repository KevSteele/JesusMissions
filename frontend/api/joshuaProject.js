import axios from 'axios';

const JOSHUA_API_URL = process.env.EXPO_PUBLIC_JOSHUA_API_URL;

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
