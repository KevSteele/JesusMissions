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