import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../mockData';
import { PatientCard } from '../components/PatientCard';
import { Search, Filter, Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

export const PatientList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.mrn.toLowerCase().includes(search.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patient Directory</h1>
          <p className="text-slate-500 dark:text-slate-300">Manage and monitor your active patient population.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg p-1">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-1.5 rounded-md transition-colors", view === 'grid' ? "bg-slate-100 dark:bg-slate-700 text-clinical-blue" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1.5 rounded-md transition-colors", view === 'list' ? "bg-slate-100 dark:bg-slate-700 text-clinical-blue" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          <button className="clinical-btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, MRN, or diagnosis..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-clinical-blue outline-none transition-all"
          />
        </div>
        <button className="clinical-btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="clinical-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-clinical-border dark:border-dark-border">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Diagnosis</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Stage</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Last Visit</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => window.location.href=`/patients/${patient.id}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-xs font-bold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{patient.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-300 font-mono">{patient.mrn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-200">{patient.diagnosis}</td>
                  <td className="px-6 py-4 text-sm font-bold text-clinical-blue">{patient.stage}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-300">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={cn("status-badge", 
                      patient.status === 'Active' ? 'status-active' : 
                      patient.status === 'Stable' ? 'status-stable' : 
                      patient.status === 'Progressing' ? 'status-progressing' : 'status-remission'
                    )}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};
