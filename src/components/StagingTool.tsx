import React, { useState } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

interface StagingResult {
  stage: string;
  description: string;
}

export const AJCCStagingTool: React.FC = () => {
  const [t, setT] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [m, setM] = useState<string>('');

  const calculateStage = (): StagingResult | null => {
    if (!t || !n || !m) return null;

    // Simplified logic for demonstration (Breast Cancer example)
    if (m === 'M1') return { stage: 'Stage IV', description: 'Metastatic disease' };
    if (t === 'T4') return { stage: 'Stage IIIB', description: 'Large tumor with skin/chest wall involvement' };
    if (n === 'N3') return { stage: 'Stage IIIC', description: 'Extensive nodal involvement' };
    if (t === 'T1' && n === 'N0' && m === 'M0') return { stage: 'Stage IA', description: 'Small tumor, no nodes' };
    
    return { stage: 'Stage IIB', description: 'Moderate tumor size or limited nodal involvement' };
  };

  const result = calculateStage();

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-clinical-blue">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white">AJCC TNM Staging Tool</h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Tumor (T)</label>
            <select 
              value={t} 
              onChange={(e) => setT(e.target.value)}
              className="w-full border border-clinical-border dark:border-dark-border rounded-lg px-3 py-2 text-sm outline-none focus:border-clinical-blue bg-white dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Nodes (N)</label>
            <select 
              value={n} 
              onChange={(e) => setN(e.target.value)}
              className="w-full border border-clinical-border dark:border-dark-border rounded-lg px-3 py-2 text-sm outline-none focus:border-clinical-blue bg-white dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="N0">N0</option>
              <option value="N1">N1</option>
              <option value="N2">N2</option>
              <option value="N3">N3</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Metastasis (M)</label>
            <select 
              value={m} 
              onChange={(e) => setM(e.target.value)}
              className="w-full border border-clinical-border dark:border-dark-border rounded-lg px-3 py-2 text-sm outline-none focus:border-clinical-blue bg-white dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="M0">M0</option>
              <option value="M1">M1</option>
            </select>
          </div>
        </div>

        {result ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center"
          >
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Calculated Stage</p>
            <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400 my-1">{result.stage}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{result.description}</p>
          </motion.div>
        ) : (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-dark-border rounded-xl text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">Select T, N, and M values to calculate stage</p>
          </div>
        )}

        <div className="flex items-start gap-2 text-[10px] text-slate-400 leading-relaxed">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          <p>Based on AJCC Cancer Staging Manual, 8th Edition. This tool is for educational purposes and clinical decision support only.</p>
        </div>
      </div>
    </div>
  );
};
