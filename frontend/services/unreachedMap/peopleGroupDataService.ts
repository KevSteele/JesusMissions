import axios from 'axios';
import { PeopleGroup } from '@/types/peopleGroup';

const JOSHUA_API_URL = process.env.EXPO_PUBLIC_JOSHUA_API_URL;
const JOSHUA_API_KEY = process.env.EXPO_PUBLIC_JOSHUA_API_KEY;

/**
 * Fetches people groups from the Joshua Project API
 * Filters out entries without valid coordinates
 */
export async function fetchPeopleGroupsFromJoshuaProject(): Promise<PeopleGroup[]> {
  try {
    const response = await axios.get(`${JOSHUA_API_URL}/people_groups.json`, {
      params: {
        api_key: JOSHUA_API_KEY,
        limit: 3000,
      },
    });
    
    const peopleGroups = response.data || [];
    const validPeopleGroups = peopleGroups.filter(
      (group: PeopleGroup) => group.Latitude != null && group.Longitude != null
    );
    
    return validPeopleGroups;
  } catch (error) {
    console.error('Error fetching people groups from Joshua Project API:', error);
    throw error;
  }
}

/**
 * Filters people groups by population, keeping only the top N most populous
 */
export function filterTopPeopleGroupsByPopulation(
  peopleGroups: PeopleGroup[],
  limit: number
): PeopleGroup[] {
  return peopleGroups
    .sort((a, b) => (b.Population || 0) - (a.Population || 0))
    .slice(0, limit);
}

/**
 * Validates that a people group has the required data for map display
 */
export function isValidPeopleGroupForMap(peopleGroup: PeopleGroup | null | undefined): boolean {
  if (!peopleGroup) return false;
  
  return (
    typeof peopleGroup.Latitude === 'number' &&
    typeof peopleGroup.Longitude === 'number' &&
    typeof peopleGroup.JPScale === 'number'
  );
}
