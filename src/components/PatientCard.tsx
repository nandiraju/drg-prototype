import React from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../types';
import { Calendar, User, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../types';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const statusClasses = {
    Active: 'status-active',
    Stable: 'status-stable',
    Progressing: 'status-progressing',
    Remission: 'status-remission',
  };

  return (
    <Link to={`/patients/${patient.id}`} className="clinical-card hover:border-clinical-blue transition-all group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">{patient.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 font-mono">{patient.mrn}</p>
          </div>
          <span className={cn('status-badge', statusClasses[patient.status])}>
            {patient.status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
            <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span className="font-medium">{patient.diagnosis}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
              <User className="w-3.5 h-3.5" />
              <span>{patient.age}y • {patient.gender}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last: {patient.lastVisit}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-dark-border flex justify-between items-center">
          <div className="flex gap-1">
            {patient.biomarkers.slice(0, 2).map((b) => (
              <span key={b} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded text-[10px] font-bold">
                {b}
              </span>
            ))}
            {patient.biomarkers.length > 2 && (
              <span key="more" className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded text-[10px] font-bold">
                +{patient.biomarkers.length - 2}
              </span>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-500 group-hover:text-clinical-blue transition-colors" />
        </div>
      </div>
    </Link>
  );
};
