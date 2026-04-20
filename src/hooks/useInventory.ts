import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  min_threshold: number;
  status: string;
}

export function useInventory() {
  const supabase = useSupabase();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('name');

      if (!error && data) {
        setInventory(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStock = async (id: string, newStock: number) => {
    const { data, error } = await supabase
      .from('inventory')
      .update({ stock: newStock })
      .eq('id', id)
      .select();

    if (!error && data) {
      setInventory(prev => prev.map(item => item.id === id ? data[0] : item));
    }
    return { data, error };
  };

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return { inventory, loading, fetchInventory, updateStock };
}
