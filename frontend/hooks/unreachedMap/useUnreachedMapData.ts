import { useQuery } from '@tanstack/react-query';
import { PeopleGroup } from '@/types/peopleGroup';
import { useMemo } from 'react';
import {
  fetchPeopleGroupsFromJoshuaProject,
  filterTopPeopleGroupsByPopulation,
} from '@/services/unreachedMap';

const TOP_PEOPLE_GROUPS_LIMIT = 1000; // Optimal balance for clustering performance

interface UseUnreachedMapDataResult {
  peopleGroups: PeopleGroup[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook for fetching and managing people group data for the map
 * Automatically fetches from Joshua Project API and filters to top groups by population
 */
export function useUnreachedMapData(): UseUnreachedMapDataResult {
  const {
    data: allPeopleGroups = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PeopleGroup[], Error>({
    queryKey: ['unreachedPeopleGroups'],
    queryFn: fetchPeopleGroupsFromJoshuaProject,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  // Limit to top groups by population for optimal clustering performance
  const peopleGroups = useMemo(() => {
    return filterTopPeopleGroupsByPopulation(allPeopleGroups, TOP_PEOPLE_GROUPS_LIMIT);
  }, [allPeopleGroups]);

  return {
    peopleGroups,
    totalCount: allPeopleGroups.length,
    isLoading,
    isError,
    error,
    refetch,
  };
}
