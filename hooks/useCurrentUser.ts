import useSWR from 'swr'

import fetcher from '@/lib/fetcher';

// SWR is a React Hooks library for data fetching, which is similar to React query.
// The first time we fetch this API current, no metter where we use this hook, it is not going to fetch it again if data already exists.
// By doing this, we do not need Redux or any state management for fetching our user.
const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
    
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useCurrentUser;
