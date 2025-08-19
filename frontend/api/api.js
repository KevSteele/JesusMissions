import axios from 'axios';

const STRAPI_URL = process.env.EXPO_PUBLIC_STRAPI_URL;

// Fetch data from Strapi
export const fetchStrapiData = async () => {
  try {
    const response = await axios.get(`${STRAPI_URL}/steps`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
};

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
