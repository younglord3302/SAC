import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface WorkflowStep {
  label: string;
  path: string;
  current?: boolean;
  done?: boolean;
}

interface WorkflowBannerProps {
  steps: WorkflowStep[];
  nextLabel: string;
  nextPath: string;
  nextDesc: string;
}

export function WorkflowBanner({ steps, nextLabel, nextPath, nextDesc }: WorkflowBannerProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-5 rounded-2xl bg-blue-600/5 border border-blue-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      {/* Step Breadcrumb */}
      <div className="flex items-center gap-2 flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => navigate(step.path)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                step.current
                  ? 'bg-blue-600 text-white'
                  : step.done
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {step.done && '✓ '}{step.label}
            </button>
            {i < steps.length - 1 && <ArrowRight size={12} className="text-slate-700 flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Next Action CTA */}
      <button
        onClick={() => navigate(nextPath)}
        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 group"
      >
        <span className="hidden md:block text-blue-200 font-normal mr-1">{nextDesc} →</span>
        {nextLabel}
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
}
