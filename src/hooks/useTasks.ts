import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done' | 'Blocked';
  assigned_to: string;
  due_date: string;
}

export function useTasks(projectId?: string) {
  const supabase = useSupabase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from('tasks').select('*');
      
      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (!error && data) {
        setTasks(data as Task[]);
      }
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createTask = async (task: Omit<Task, 'id'>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select();

    if (!error && data) {
      setTasks(prev => [data[0] as Task, ...prev]);
    }
    return { data, error };
  };

  const updateTaskStatus = async (id: string, status: Task['status']) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    }
    return { error };
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, fetchTasks, createTask, updateTaskStatus };
}
