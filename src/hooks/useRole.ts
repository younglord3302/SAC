import { useUser } from '@clerk/react';
import { useMemo } from 'react';
import { SAC_ROLE_KEY } from '../components/SignInPortal';

export type UserRole = 'worker' | 'contractor' | 'owner';

export function useRole() {
  const { user, isLoaded } = useUser();

  const role = useMemo<UserRole>(() => {
    if (!isLoaded || !user) return 'contractor';
    
    // 1. First check Clerk public metadata (set by admin — most authoritative)
    const clerkRole = user.publicMetadata?.role as UserRole;
    if (clerkRole) return clerkRole;

    // 2. Fall back to localStorage (set when user clicked a portal at login)
    const localRole = localStorage.getItem(SAC_ROLE_KEY) as UserRole | null;
    if (localRole && ['owner', 'contractor', 'worker'].includes(localRole)) {
      return localRole;
    }

    // 3. Final default
    return 'contractor';
  }, [user, isLoaded]);

  return { role, isLoaded };
}
