import { useState, useEffect, useCallback, useRef } from 'react';

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

export interface UseGeoLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maxAge?: number;
  watchPosition?: boolean;
  fallbackCenter?: [number, number];
}

export interface UseGeoLocationReturn {
  location: GeoLocation | null;
  isLoading: boolean;
  error: string | null;
  permissionState: 'prompt' | 'granted' | 'denied' | 'unavailable';
  requestLocation: () => void;
  fallbackCenter: [number, number];
}

const DEFAULT_FALLBACK: [number, number] = [40.7128, -74.006]; // NYC

export const useGeolocation = (options: UseGeoLocationOptions = {}): UseGeoLocationReturn => {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maxAge = 0,
    watchPosition = true,
    fallbackCenter = DEFAULT_FALLBACK,
  } = options;

  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unavailable'>('prompt');
  const watchIdRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const handleSuccess = useCallback(
    (position: GeolocationPosition) => {
      if (!mountedRef.current) return;
      const { latitude, longitude, accuracy } = position.coords;
      setLocation({
        lat: latitude,
        lng: longitude,
        accuracy,
        timestamp: position.timestamp,
      });
      setIsLoading(false);
      setError(null);
      setPermissionState('granted');
    },
    []
  );

  const handleError = useCallback(
    (err: GeolocationPositionError) => {
      if (!mountedRef.current) return;
      setIsLoading(false);
      stopWatching();

      switch (err.code) {
        case err.PERMISSION_DENIED:
          setPermissionState('denied');
          setError('Location access denied. Please enable location permissions in your browser settings.');
          break;
        case err.POSITION_UNAVAILABLE:
          setPermissionState('unavailable');
          setError('Location information is unavailable. Your device may not support GPS.');
          break;
        case err.TIMEOUT:
          setError('Location request timed out. Please try again.');
          break;
        default:
          setError('An unknown error occurred while retrieving location.');
      }
    },
    [stopWatching]
  );

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setPermissionState('unavailable');
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Check current permission state
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (!mountedRef.current) return;
        setPermissionState(result.state as typeof permissionState);

        if (result.state === 'denied') {
          setIsLoading(false);
          setError('Location access denied. Please enable location permissions in your browser settings.');
          return;
        }
      }).catch(() => {
        // Permissions API not fully supported, proceed with geolocation request
      });
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy,
      timeout,
      maximumAge: maxAge,
    });

    // Start watching if enabled
    if (watchPosition) {
      watchIdRef.current = navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy,
        timeout,
        maximumAge: maxAge,
      });
    }
  }, [enableHighAccuracy, timeout, maxAge, watchPosition, handleSuccess, handleError]);

  // Auto-request on mount
  useEffect(() => {
    mountedRef.current = true;
    requestLocation();

    return () => {
      mountedRef.current = false;
      stopWatching();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    location,
    isLoading,
    error,
    permissionState,
    requestLocation,
    fallbackCenter,
  };
};

export default useGeolocation;
