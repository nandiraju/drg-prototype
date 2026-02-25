import React from 'react';
import { MOCK_PATIENTS, MOCK_TRIALS } from '../mockData';
import { PatientCard } from '../components/PatientCard';
import { BSACalculator, CrClCalculator } from '../components/Calculators';
import { Bell, TrendingUp, Microscope, Newspaper, Plus, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-300">Welcome back, Dr. Chen. You have 4 alerts today.</p>
        </div>
        <div className="flex gap-2">
          <button className="clinical-btn-secondary flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            View Analytics
          </button>
          <button className="clinical-btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Patients */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">Recent Patients</h2>
              <button className="text-sm text-clinical-blue font-medium hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_PATIENTS.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </section>

          {/* Active Trials Matches */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">Clinical Trial Matches</h2>
              <button className="text-sm text-clinical-blue font-medium hover:underline">Manage Trials</button>
            </div>
            <div className="space-y-3">
              {MOCK_TRIALS.map((trial) => (
                <div key={trial.id} className="clinical-card p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">{trial.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-300">{trial.phase} • {trial.criteria.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600">{trial.matchScore}%</span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Match Score</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Alerts Panel */}
          <div className="clinical-card">
            <div className="p-4 border-b border-clinical-border dark:border-dark-border bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-500" />
                Clinical Alerts
              </h3>
              <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-[10px] font-bold px-1.5 py-0.5 rounded">4 New</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-dark-border">
              <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Critical Lab: Robert Miller</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 mt-1">ANC 0.4 x10³/µL - Action required</p>
                <p className="text-[9px] text-rose-500 font-bold mt-2">10 mins ago</p>
              </div>
              <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Imaging Report: Sarah Johnson</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 mt-1">Chest CT available for review</p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-2">2 hours ago</p>
              </div>
            </div>
          </div>

          {/* Quick Calculator */}
          <div className="space-y-4">
            <BSACalculator />
            <CrClCalculator />
          </div>

          {/* Oncology News Feed */}
          <div className="clinical-card">
            <div className="p-4 border-b border-clinical-border dark:border-dark-border bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-clinical-blue" />
                Oncology Insights
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="group cursor-pointer">
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">ASCO 2026: New data on ADC combinations in Breast Cancer</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 mt-1">Journal of Clinical Oncology • 1d ago</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">FDA Approves new TKI for EGFR Exon 20 insertions</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 mt-1">Regulatory Update • 3d ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
