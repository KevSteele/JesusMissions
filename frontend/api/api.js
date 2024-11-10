import Constants from 'expo-constants';
import axios from 'axios';

const {STRAPI_URL} = Constants.expoConfig.extra; // Get the STRAPI_URL from the expoConfig, which is set in app.json "extra" field

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

// const {JOSHUA_API_URL} = Constants.expoConfig.extra; // Set your Joshua Project API URL here

// // Fetch data from Joshua Project API
// export const fetchJoshuaData = async () => {
//   try {
//     const response = await axios.get(`${JOSHUA_API_URL}/countries`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching from Joshua Project API:', error);
//   }
// };