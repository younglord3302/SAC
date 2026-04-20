import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';

export interface Vehicle {
  id: string;
  registration_number: string;
  model: string;
  status: 'Idle' | 'On Delivery' | 'Maintenance';
  current_location: string;
}

export function useVehicles() {
  const supabase = useSupabase();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('registration_number');

      if (!error && data) {
        setVehicles(data as Vehicle[]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateVehicleStatus = async (id: string, status: Vehicle['status']) => {
    const { error } = await supabase
      .from('vehicles')
      .update({ status })
      .eq('id', id);
    
    if (!error) {
      setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    }
    return { error };
  };

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loading, updateVehicleStatus, fetchVehicles };
}
