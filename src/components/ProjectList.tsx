import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

export function ProjectList({ searchTerm = '' }: { searchTerm?: string }) {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="glass p-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="glass overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Active Projects</h3>
        <button
          onClick={() => navigate('/dashboard/projects')}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group"
        >
          View All
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-white/5 font-semibold">
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Execution Progress</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Tasks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  {searchTerm ? 'No projects match your search.' : 'No active projects found.'}
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr 
                  key={project.id} 
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-white group-hover:text-blue-400 transition-colors cursor-pointer">{project.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{project.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-300 w-10">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      project.status === 'Active' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-white">0</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
