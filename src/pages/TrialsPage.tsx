import React, { useState } from 'react';
import { MOCK_TRIALS } from '../mockData';
import { Microscope, Search, Filter, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

export const TrialsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredTrials = MOCK_TRIALS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Trials Explorer</h1>
          <p className="text-slate-500 dark:text-slate-400">Identify and screen patients for active oncology research protocols.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by trial name, phase, or criteria..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-clinical-blue outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="clinical-card p-5">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Filter by Status</h3>
            <div className="space-y-2">
              {['Recruiting', 'Active', 'Closed'].map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-clinical-blue focus:ring-clinical-blue" defaultChecked={status === 'Recruiting'} />
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="clinical-card p-5">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Filter by Phase</h3>
            <div className="space-y-2">
              {['Phase 1', 'Phase 2', 'Phase 3'].map(phase => (
                <label key={phase} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-clinical-blue focus:ring-clinical-blue" defaultChecked />
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{phase}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Trials List */}
        <div className="lg:col-span-3 space-y-6">
          {filteredTrials.map((trial) => (
            <div key={trial.id} className="clinical-card p-6 hover:border-clinical-blue transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{trial.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{trial.phase}</span>
                      <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                        trial.status === 'Recruiting' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      )}>
                        {trial.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-600">{trial.matchScore}%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Match Rate</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{trial.description}</p>
              
              <div className="mb-6">
                <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Key Eligibility Criteria</h5>
                <div className="flex flex-wrap gap-2">
                  {trial.criteria.map(c => (
                    <div key={c} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px] font-bold border border-slate-100 dark:border-dark-border">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-dark-border">
                <button className="clinical-btn-primary text-xs flex items-center gap-2">
                  Screen Patients <ArrowRight className="w-3 h-3" />
                </button>
                <button className="clinical-btn-secondary text-xs flex items-center gap-2">
                  View Full Protocol <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
