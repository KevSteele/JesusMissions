import { useQuery } from '@tanstack/react-query';
import { fetchPeopleGroups } from '@/api/joshuaProject';
import { PeopleGroup } from '@/types/peopleGroup';
import { useMemo } from 'react';

export const useUnreachedMapData = () => {
    const {
        data: allPeopleGroups = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<PeopleGroup[], Error>({
        queryKey: ['unreachedPeopleGroups'],
        queryFn: fetchPeopleGroups,
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });

    // Limit to top 1000 by population - optimal balance for clustering performance
    const peopleGroups = useMemo(() => {
        return allPeopleGroups
            .sort((a, b) => (b.Population || 0) - (a.Population || 0))
            .slice(0, 1000);
    }, [allPeopleGroups]);

    return {
        peopleGroups,
        totalCount: allPeopleGroups.length,
        isLoading,
        isError,
        error,
        refetch,
    };
};
