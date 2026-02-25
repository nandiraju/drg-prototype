import React, { useState } from 'react';
import { MOCK_DRUGS } from '../mockData';
import { Search, Pill, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const DrugDatabase: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filteredDrugs = MOCK_DRUGS.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Oncology Drug Database</h1>
          <p className="text-slate-500 dark:text-slate-400">Search for dosage, toxicities, and interactions.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search drugs by name or class..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-clinical-blue outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDrugs.map((drug) => (
          <div key={drug.id} className="clinical-card hover:border-clinical-blue transition-all group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex items-center justify-center text-clinical-blue">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">{drug.name}</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{drug.class}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Common Indications</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {drug.indications.map(i => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px] font-bold">{i}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Standard Dosage</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{drug.commonDose}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Key Toxicities
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {drug.toxicities.map(t => (
                        <li key={t} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Drug Interactions
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">{drug.interactions[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
