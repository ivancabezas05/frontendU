import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from '@/utils/axios';

// ----------------------------------------------------------------------

export function useGetReservas() {
  const URL = endpoints.reserva.list();

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      reservas: data || [],
      reservasLoading: isLoading,
      reservasError: error,
      reservasValidating: isValidating,
      reservasEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}