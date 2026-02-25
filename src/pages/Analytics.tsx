import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Users, Activity, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

const TREATMENT_DATA = [
  { name: 'Chemo', count: 45 },
  { name: 'Immuno', count: 32 },
  { name: 'Targeted', count: 28 },
  { name: 'Radiation', count: 15 },
  { name: 'Surgery', count: 12 },
];

const SURVIVAL_DATA = [
  { month: 0, rate: 100 },
  { month: 6, rate: 95 },
  { month: 12, rate: 88 },
  { month: 18, rate: 82 },
  { month: 24, rate: 75 },
  { month: 30, rate: 70 },
  { month: 36, rate: 65 },
];

const DIAGNOSIS_DATA = [
  { name: 'Breast', value: 40 },
  { name: 'Lung', value: 25 },
  { name: 'Colorectal', value: 20 },
  { name: 'Prostate', value: 15 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

export const Analytics: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Practice Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Overview of patient outcomes and treatment distribution.</p>
        </div>
        <div className="flex gap-2">
          <button className="clinical-btn-secondary">Export Data</button>
          <button className="clinical-btn-primary">Generate Report</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Active Treatments', value: '342', change: '+5%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Critical Alerts', value: '14', change: '-2%', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Trial Enrollment', value: '8.4%', change: '+1.2%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((stat, i) => (
          <div key={i} className="clinical-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn("text-xs font-bold", stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600')}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Treatment Distribution */}
        <div className="clinical-card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Treatment Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TREATMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
                    backgroundColor: 'var(--tooltip-bg)',
                    color: 'var(--tooltip-text)'
                  }}
                  itemStyle={{ color: 'inherit' }}
                  cursor={{ fill: '#f8fafc', opacity: 0.1 }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Survival Curve */}
        <div className="clinical-card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Overall Survival (Practice-wide)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SURVIVAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5, fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis label={{ value: 'Survival %', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
                    backgroundColor: 'var(--tooltip-bg)',
                    color: 'var(--tooltip-text)'
                  }}
                  itemStyle={{ color: 'inherit' }}
                />
                <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diagnosis Mix */}
        <div className="clinical-card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Diagnosis Mix</h3>
          <div className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DIAGNOSIS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DIAGNOSIS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
                    backgroundColor: 'var(--tooltip-bg)',
                    color: 'var(--tooltip-text)'
                  }}
                  itemStyle={{ color: 'inherit' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 pr-8">
              {DIAGNOSIS_DATA.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.name}</span>
                  <span className="text-xs text-slate-400">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placeholder for AI Insights */}
        <div className="clinical-card p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold">AI Practice Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <p className="text-xs font-bold uppercase opacity-70">Efficiency Opportunity</p>
              <p className="text-sm mt-1">Patient wait times for infusion have increased by 15% this month. Consider optimizing cycle scheduling.</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <p className="text-xs font-bold uppercase opacity-70">Trial Enrollment</p>
              <p className="text-sm mt-1">42 patients match the new DESTINY-Breast06 trial. Automated eligibility screening recommended.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
