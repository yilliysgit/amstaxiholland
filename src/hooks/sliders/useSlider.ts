import { useState, useCallback } from 'react';

interface UseSliderProps {
  totalItems: number;
  itemsPerSlide?: number;
}

export const useSlider = ({ totalItems, itemsPerSlide = 2 }: UseSliderProps) => {
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideNext = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const slidePrev = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  return {
    currentSlide,
    totalSlides,
    slideNext,
    slidePrev,
    goToSlide,
    canSlidePrev: totalSlides > 1,
    canSlideNext: totalSlides > 1
  };
};