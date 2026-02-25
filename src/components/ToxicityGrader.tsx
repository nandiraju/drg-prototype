import React, { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '../types';

export const ToxicityGrader: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const grades = [
    { level: 1, label: 'Mild', desc: 'Asymptomatic or mild symptoms; clinical or diagnostic observations only; intervention not indicated.' },
    { level: 2, label: 'Moderate', desc: 'Minimal, local or noninvasive intervention indicated; limiting age-appropriate instrumental ADL.' },
    { level: 3, label: 'Severe', desc: 'Severe or medically significant but not immediately life-threatening; hospitalization or prolongation of hospitalization indicated.' },
    { level: 4, label: 'Life-threatening', desc: 'Life-threatening consequences; urgent intervention indicated.' },
    { level: 5, label: 'Death', desc: 'Death related to AE.' },
  ];

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white">CTCAE Toxicity Grading</h3>
      </div>

      <div className="space-y-3">
        {grades.map((g) => (
          <button
            key={g.level}
            onClick={() => setSelectedGrade(g.level)}
            className={cn(
              "w-full text-left p-3 rounded-xl border transition-all",
              selectedGrade === g.level 
                ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 ring-2 ring-rose-100 dark:ring-rose-900/20" 
                : "bg-white dark:bg-slate-800 border-clinical-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded",
                g.level >= 3 
                  ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300" 
                  : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
              )}>
                GRADE {g.level}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{g.label}</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{g.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 text-[10px] text-slate-400">
        <Info className="w-3 h-3 mt-0.5 shrink-0" />
        <p>Common Terminology Criteria for Adverse Events (CTCAE) v5.0. Used for standardized reporting of adverse events in oncology.</p>
      </div>
    </div>
  );
};
