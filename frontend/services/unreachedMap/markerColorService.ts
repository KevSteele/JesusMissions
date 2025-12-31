import { PeopleGroup } from '@/types/peopleGroup';

/**
 * Color scheme for people group reach status
 */
export const MARKER_COLORS = {
  UNREACHED: '#DC2626',  // Red - JPScale <= 2
  MINIMAL: '#F97316',    // Orange - JPScale === 3
  REACHED: '#16A34A',    // Green - JPScale >= 4
} as const;

/**
 * Determines the marker color based on JPScale
 */
export function getMarkerColorForPeopleGroup(peopleGroup: PeopleGroup): string {
  if (peopleGroup.JPScale <= 2) {
    return MARKER_COLORS.UNREACHED;
  } else if (peopleGroup.JPScale === 3) {
    return MARKER_COLORS.MINIMAL;
  } else {
    return MARKER_COLORS.REACHED;
  }
}

/**
 * Calculates the dominant color for a cluster based on nearby people groups
 * Uses the administrative region (LocationInCountry or ISO3) to determine which groups are "nearby"
 */
export function calculateClusterColor(
  clusterLatitude: number,
  clusterLongitude: number,
  allPeopleGroups: PeopleGroup[]
): string {
  // Safety check
  if (!allPeopleGroups || allPeopleGroups.length === 0) {
    return MARKER_COLORS.UNREACHED;
  }

  // Find closest group to determine regional context
  const closestGroup = findClosestPeopleGroup(clusterLatitude, clusterLongitude, allPeopleGroups);
  
  if (!closestGroup || !closestGroup.ISO3) {
    return MARKER_COLORS.UNREACHED;
  }

  // Find all groups in the same administrative region
  const nearbyGroups = filterPeopleGroupsByRegion(closestGroup, allPeopleGroups);

  // Calculate dominant reach status
  const unreachedCount = nearbyGroups.filter(group => group.JPScale <= 2).length;
  const minimalCount = nearbyGroups.filter(group => group.JPScale === 3).length;
  const reachedCount = nearbyGroups.filter(group => group.JPScale >= 4).length;
  
  // Determine color based on majority
  const maxCount = Math.max(unreachedCount, minimalCount, reachedCount);
  
  if (reachedCount === maxCount && reachedCount > 0) {
    return MARKER_COLORS.REACHED;
  } else if (minimalCount === maxCount && minimalCount > 0) {
    return MARKER_COLORS.MINIMAL;
  } else {
    return MARKER_COLORS.UNREACHED;
  }
}

/**
 * Finds the closest people group to the given coordinates
 */
function findClosestPeopleGroup(
  latitude: number,
  longitude: number,
  peopleGroups: PeopleGroup[]
): PeopleGroup | null {
  let closestGroup: PeopleGroup | null = null;
  let minDistance = Infinity;
  
  for (const group of peopleGroups) {
    // Skip invalid groups
    if (typeof group.Latitude !== 'number' || typeof group.Longitude !== 'number') {
      continue;
    }
    
    const distance = calculateGeographicDistance(
      latitude,
      longitude,
      group.Latitude,
      group.Longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestGroup = group;
    }
  }
  
  return closestGroup;
}

/**
 * Filters people groups by the same administrative region as the reference group
 * Priority: LocationInCountry (state/province) > Country (ISO3)
 */
function filterPeopleGroupsByRegion(
  referenceGroup: PeopleGroup,
  allPeopleGroups: PeopleGroup[]
): PeopleGroup[] {
  return allPeopleGroups.filter((group) => {
    // Must have valid data
    if (!group || !group.ISO3) return false;
    
    // Must be same country
    if (group.ISO3 !== referenceGroup.ISO3) return false;
    
    // If LocationInCountry exists (e.g., "Illinois"), use it for tighter clustering
    if (referenceGroup.LocationInCountry && group.LocationInCountry) {
      return group.LocationInCountry === referenceGroup.LocationInCountry;
    }
    
    // Otherwise, cluster by country (useful for small countries)
    return true;
  });
}

/**
 * Calculates simple Euclidean distance between two geographic coordinates
 * Note: This is approximate and suitable for clustering purposes
 */
function calculateGeographicDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number {
  const latitudeDifference = Math.abs(latitude2 - latitude1);
  const longitudeDifference = Math.abs(longitude2 - longitude1);
  return Math.sqrt(
    latitudeDifference * latitudeDifference + 
    longitudeDifference * longitudeDifference
  );
}
