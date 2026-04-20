import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';

export interface Driver {
  id: string;
  full_name: string;
  status: 'Active' | 'Inactive';
  license_number: string;
  role: string;
  phone?: string;
  email?: string;
}

export function useDrivers() {
  const supabase = useSupabase();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrivers = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .order('full_name');

      if (!error && data) {
        setDrivers(data as Driver[]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addDriver = async (driver: Omit<Driver, 'id'>) => {
    const { data, error } = await supabase
      .from('drivers')
      .insert([driver])
      .select();

    if (!error && data) {
      setDrivers(prev => [...prev, data[0] as Driver]);
    }
    return { data, error };
  };

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return { drivers, loading, fetchDrivers, addDriver };
}
