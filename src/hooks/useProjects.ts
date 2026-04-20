import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';

export interface Project {
  id: string;
  name: string;
  location: string;
  status: string;
  progress: number;
  budget: number;
}

export function useProjects() {
  const supabase = useSupabase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (project: Omit<Project, 'id'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select();

    if (!error && data) {
      setProjects(prev => [data[0], ...prev]);
    }
    return { data, error };
  };

  const fetchProjectById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      return { data: data as Project, error };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, fetchProjects, createProject, fetchProjectById };
}
