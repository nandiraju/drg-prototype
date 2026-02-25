import React, { useState } from 'react';
import { FileText, Search, Download, Filter, FileCheck, FileWarning, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

export const ReportsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const reports = [
    { id: 'R1', title: 'Pathology Report - Sarah Johnson', date: '2026-02-15', patient: 'Sarah Johnson', type: 'Pathology', status: 'Final', size: '1.2 MB' },
    { id: 'R2', title: 'Genomics Panel (NGS) - Robert Miller', date: '2026-02-20', patient: 'Robert Miller', type: 'Genomics', status: 'Pending', size: '450 KB' },
    { id: 'R3', title: 'Chest CT Imaging - Elena Rodriguez', date: '2026-01-10', patient: 'Elena Rodriguez', type: 'Imaging', status: 'Final', size: '2.4 MB' },
    { id: 'R4', title: 'Surgical Summary - Sarah Johnson', date: '2025-12-10', patient: 'Sarah Johnson', type: 'Clinical Note', status: 'Final', size: '800 KB' },
    { id: 'R5', title: 'Bone Scan - Robert Miller', date: '2026-02-18', patient: 'Robert Miller', type: 'Imaging', status: 'Final', size: '1.8 MB' },
  ];

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Access and review pathology, imaging, and genomics data.</p>
        </div>
        <div className="flex gap-2">
          <button className="clinical-btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Batch Download
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search reports by patient or title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-clinical-blue outline-none transition-all"
          />
        </div>
        <button className="clinical-btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter Type
        </button>
      </div>

      <div className="clinical-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-clinical-border dark:border-dark-border">
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Report Name</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Patient</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Type</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">{report.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{report.patient}</td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{report.type}</td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{report.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {report.status === 'Final' ? (
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span className={cn(
                      "text-[10px] font-bold uppercase",
                      report.status === 'Final' ? 'text-emerald-600' : 'text-amber-600'
                    )}>
                      {report.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-clinical-blue transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
