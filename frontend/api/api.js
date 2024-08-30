// api.js
import { REACT_NATIVE_APP_API_URL, REACT_NATIVE_APP_JOSHUA_API_URL } from '@env';
import axios from 'axios';

// Fetch data from Strapi
export const fetchStrapiData = async () => {
  try {
    const response = await axios.get(`${REACT_NATIVE_APP_API_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
  }
};

// Fetch data from Joshua Project API
export const fetchJoshuaData = async () => {
  try {
    const response = await axios.get(`${REACT_NATIVE_APP_JOSHUA_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Joshua Project API:', error);
  }
};
