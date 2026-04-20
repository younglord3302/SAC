import { useUser } from '@clerk/react';
import { useMemo } from 'react';

export type UserRole = 'worker' | 'contractor' | 'owner';

export function useRole() {
  const { user, isLoaded } = useUser();

  const role = useMemo<UserRole>(() => {
    if (!isLoaded || !user) return 'contractor'; // default fallback for loading/errors
    
    // Check Clerk public metadata
    const userRole = user.publicMetadata?.role as UserRole;
    
    // If no role is explicitly set, we default to 'contractor' globally 
    // for testing, so you aren't locked out of the features!
    return userRole || 'contractor'; 
  }, [user, isLoaded]);

  return { role, isLoaded };
}
