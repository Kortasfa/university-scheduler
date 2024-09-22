'use client';

import { useState, useEffect } from 'react';

export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsPWA(true)
    }
      
  }, []);

  return isPWA;
}