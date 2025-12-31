import { useRef, useCallback, useState } from 'react';
import { Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { PeopleGroup } from '@/types/peopleGroup';

interface UseLegendControlResult {
  legendVisible: boolean;
  contentWidth: number;
  slideAnimation: Animated.Value;
  setContentWidth: (width: number) => void;
  toggleLegend: () => void;
}

/**
 * Hook for managing the legend visibility and animation
 */
export function useLegendControl(): UseLegendControlResult {
  const [legendVisible, setLegendVisible] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const toggleLegend = useCallback(() => {
    // Slide by content width so only toggle button remains visible
    const toValue = legendVisible ? -contentWidth : 0;
    
    Animated.timing(slideAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    setLegendVisible(!legendVisible);
  }, [legendVisible, slideAnimation, contentWidth]);

  return {
    legendVisible,
    contentWidth,
    slideAnimation,
    setContentWidth,
    toggleLegend,
  };
}

interface UseBottomSheetControlResult {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  selectedPeopleGroup: PeopleGroup | null;
  handleMarkerPress: (peopleGroup: PeopleGroup) => void;
  handleCloseBottomSheet: () => void;
}

/**
 * Hook for managing the bottom sheet state and interactions
 */
export function useBottomSheetControl(): UseBottomSheetControlResult {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedPeopleGroup, setSelectedPeopleGroup] = useState<PeopleGroup | null>(null);

  const handleMarkerPress = useCallback((peopleGroup: PeopleGroup) => {
    if (!peopleGroup) return;
    setSelectedPeopleGroup(peopleGroup);
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedPeopleGroup(null);
  }, []);

  return {
    bottomSheetRef,
    selectedPeopleGroup,
    handleMarkerPress,
    handleCloseBottomSheet,
  };
}
