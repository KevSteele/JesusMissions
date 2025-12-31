import { PeopleGroup } from '@/types/peopleGroup';

/**
 * Shared interface for both iOS and Android map implementations
 * Both maps should accept these exact same props
 */
export interface UnreachedMapViewProps {
    peopleGroups: PeopleGroup[];
    isLoading: boolean;
    onMarkerPress: (peopleGroup: PeopleGroup) => void;
    initialRegion?: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
}
