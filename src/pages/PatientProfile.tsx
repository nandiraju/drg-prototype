import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PATIENTS, MOCK_TIMELINE, MOCK_LABS, MOCK_TREATMENTS, MOCK_TRIALS } from '../mockData';
import { AJCCStagingTool } from '../components/StagingTool';
import { ToxicityGrader } from '../components/ToxicityGrader';
import { 
  User, 
  Activity, 
  Calendar, 
  FlaskConical, 
  Stethoscope, 
  FileText, 
  Microscope, 
  ChevronLeft,
  AlertCircle,
  Clock,
  ArrowRight,
  Download,
  ExternalLink,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

export const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patient = MOCK_PATIENTS.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!patient) return <div className="p-8 text-center">Patient not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'labs', label: 'Labs', icon: FlaskConical },
    { id: 'treatments', label: 'Treatments', icon: Stethoscope },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'trials', label: 'Trials', icon: Microscope },
  ];

  return (
    <div className="min-h-screen bg-clinical-bg dark:bg-dark-bg">
      {/* Patient Header */}
      <div className="bg-white dark:bg-dark-card border-b border-clinical-border dark:border-dark-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <Link to="/" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-clinical-blue transition-colors mb-4">
            <ChevronLeft className="w-3 h-3" />
            BACK TO DASHBOARD
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{patient.name}</h1>
                  <span className={cn('status-badge', 
                    patient.status === 'Active' ? 'status-active' : 
                    patient.status === 'Stable' ? 'status-stable' : 
                    patient.status === 'Progressing' ? 'status-progressing' : 'status-remission'
                  )}>
                    {patient.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-300">
                  <span className="font-mono font-bold">{patient.mrn}</span>
                  <span>•</span>
                  <span>{patient.age}y {patient.gender}</span>
                  <span>•</span>
                  <span>ECOG: {patient.ecog}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="clinical-btn-secondary">Edit Profile</button>
              <button className="clinical-btn-primary">Update Treatment</button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mt-6 -mb-4 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap",
                  activeTab === tab.id 
                    ? "border-clinical-blue text-clinical-blue" 
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Demographics & Markers */}
          <div className="space-y-6">
            <div className="clinical-card p-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Diagnosis & Staging</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{patient.diagnosis}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">Primary Site</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <p className="text-lg font-bold text-clinical-blue">{patient.stage}</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase mt-1">Current AJCC Stage</p>
                </div>
              </div>
            </div>

            <AJCCStagingTool />

            <ToxicityGrader />

            <div className="clinical-card p-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Biomarkers</h3>
              <div className="flex flex-wrap gap-2">
                {patient.biomarkers.map(b => (
                  <span key={b} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-bold border border-slate-200 dark:border-dark-border">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="clinical-card p-5 bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30">
              <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                Critical Alerts
              </h3>
              <div className="space-y-3">
                <div className="text-xs text-rose-700 dark:text-rose-300">
                  <p className="font-bold">Neutropenia Risk</p>
                  <p className="mt-1 opacity-80">ANC dropped 20% since last cycle. Monitor for fever.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="clinical-card p-4">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Current Regimen</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">AC-T (Dose Dense)</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-300">Cycle 3 of 4</span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-clinical-blue"></div>
                        </div>
                      </div>
                    </div>
                    <div className="clinical-card p-4">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Last Lab ANC</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">1.2 x10³/µL</p>
                      <p className="text-[10px] text-rose-500 font-bold mt-2">Low - Grade 2</p>
                    </div>
                    <div className="clinical-card p-4">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Next Appointment</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Feb 28, 2026</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-300 mt-2">Treatment Visit</p>
                    </div>
                  </div>

                  {/* Recent Activity Mini-Timeline */}
                  <section>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {MOCK_TIMELINE.slice(0, 3).map((event, idx) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                              event.type === 'Diagnosis' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                              event.type === 'Treatment' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            )}>
                              {event.type === 'Diagnosis' ? <Activity className="w-4 h-4" /> :
                               event.type === 'Treatment' ? <Stethoscope className="w-4 h-4" /> :
                               <Calendar className="w-4 h-4" />}
                            </div>
                            {idx < 2 && <div className="w-0.5 h-full bg-slate-100 dark:bg-dark-border my-1"></div>}
                          </div>
                          <div className="pb-6">
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500">{event.date}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{event.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="clinical-card p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Longitudinal Patient Journey</h3>
                    <div className="flex gap-2">
                      <button className="clinical-btn-secondary text-xs">Filter</button>
                      <button className="clinical-btn-secondary text-xs">Export PDF</button>
                    </div>
                  </div>
                  
                  {/* Visual Timeline Placeholder */}
                  <div className="relative h-96 border-l-2 border-slate-100 dark:border-dark-border ml-4 space-y-12">
                    {MOCK_TIMELINE.map((event) => (
                      <div key={event.id} className="relative pl-8">
                        <div className={cn(
                          "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-dark-card",
                          event.type === 'Diagnosis' ? 'bg-blue-500' :
                          event.type === 'Treatment' ? 'bg-emerald-500' :
                          event.type === 'Toxicity' ? 'bg-rose-500' : 'bg-slate-400'
                        )}></div>
                        <div className="clinical-card p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{event.date} • {event.type}</span>
                              <h4 className="font-bold text-slate-900 dark:text-white mt-1">{event.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">{event.description}</p>
                            </div>
                            {event.severity && (
                              <span className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                event.severity === 'High' ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300' :
                                event.severity === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                                'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                              )}>
                                {event.severity} SEVERITY
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'labs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Laboratory Results</h3>
                    <div className="flex gap-2">
                      <select className="text-xs border border-clinical-border dark:border-dark-border rounded px-2 py-1 bg-white dark:bg-slate-800 dark:text-white outline-none">
                        <option>Last 3 Months</option>
                        <option>Last 6 Months</option>
                        <option>All History</option>
                      </select>
                    </div>
                  </div>

                  <div className="clinical-card overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-clinical-border dark:border-dark-border">
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Test Name</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Value</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Reference Range</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                        {MOCK_LABS.map((lab) => (
                          <tr key={lab.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{lab.name}</td>
                            <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-slate-200">{lab.value} {lab.unit}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-300">{lab.range}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-300">{lab.date}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                                lab.status === 'Normal' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                lab.status === 'Low' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                                'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                              )}>
                                {lab.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'treatments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Treatment History</h3>
                    <button className="clinical-btn-primary text-xs flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Cycle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {MOCK_TREATMENTS.map((t) => (
                      <div key={t.id} className="clinical-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Stethoscope className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 dark:text-white">{t.drug}</h4>
                              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">CYCLE {t.cycle}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.type} • {t.dose}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{t.date}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mt-1">Administered</p>
                          </div>
                          <div className="text-right">
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-1 rounded uppercase",
                              t.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            )}>
                              {t.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Clinical Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Pathology Report', date: '2025-11-15', type: 'PDF', size: '1.2 MB' },
                      { title: 'Genomics Panel (NGS)', date: '2025-11-20', type: 'Structured', size: '450 KB' },
                      { title: 'Surgical Notes', date: '2025-12-10', type: 'PDF', size: '800 KB' },
                      { title: 'PET/CT Imaging Report', date: '2025-12-05', type: 'PDF', size: '2.4 MB' },
                    ].map((report, i) => (
                      <div key={i} className="clinical-card p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">{report.title}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-300 mt-0.5">{report.date} • {report.type}</p>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-slate-300 group-hover:text-clinical-blue" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'trials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Matching Clinical Trials</h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">2 HIGH CONFIDENCE MATCHES</span>
                  </div>
                  <div className="space-y-4">
                    {MOCK_TRIALS.map((trial) => (
                      <div key={trial.id} className="clinical-card p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{trial.name}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{trial.phase} • {trial.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-emerald-600">{trial.matchScore}%</p>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Match Score</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">{trial.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {trial.criteria.map(c => (
                            <span key={c} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded text-[10px] font-bold border border-emerald-100 dark:border-emerald-900/30">
                              {c}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button className="clinical-btn-primary text-xs flex items-center gap-2">
                            Check Eligibility <ArrowRight className="w-3 h-3" />
                          </button>
                          <button className="clinical-btn-secondary text-xs flex items-center gap-2">
                            View Protocol <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
