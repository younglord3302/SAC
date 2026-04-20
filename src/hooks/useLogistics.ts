import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';

export interface Delivery {
  id: string;
  project_id: string;
  vehicle_id: string;
  status: string;
  origin: string;
  destination: string;
  material_type: string;
}

export function useLogistics() {
  const supabase = useSupabase();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deliveries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDeliveries(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createDelivery = async (delivery: Omit<Delivery, 'id'>) => {
    const { data, error } = await supabase
      .from('deliveries')
      .insert([delivery])
      .select();

    if (!error && data) {
      setDeliveries(prev => [data[0], ...prev]);
    }
    return { data, error };
  };

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  return { deliveries, loading, fetchDeliveries, createDelivery };
}
