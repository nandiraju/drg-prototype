import React, { useState } from 'react';
import { 
  BSACalculator, 
  CrClCalculator, 
  BMICalculator, 
  ANCCalculator, 
  CalvertCalculator, 
  QTcCalculator,
  ChildPughCalculator,
  PerformanceStatusTool
} from '../components/Calculators';
import { AJCCStagingTool } from '../components/StagingTool';
import { ToxicityGrader } from '../components/ToxicityGrader';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Info, 
  ChevronRight, 
  Activity, 
  FlaskConical, 
  Stethoscope, 
  AlertTriangle,
  Heart
} from 'lucide-react';
import { cn } from '../types';

const CATEGORIES = [
  { id: 'dosing', label: 'Dosing & Metrics', icon: Calculator },
  { id: 'renal', label: 'Renal & Hepatic', icon: FlaskConical },
  { id: 'heme', label: 'Hematology', icon: Activity },
  { id: 'staging', label: 'Staging Tools', icon: Stethoscope },
  { id: 'toxicity', label: 'Toxicity Grading', icon: AlertTriangle },
  { id: 'cardiac', label: 'Cardiac Safety', icon: Heart },
];

export const CalculatorsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('dosing');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Oncology Clinical Calculators</h1>
          <p className="text-slate-500 dark:text-slate-300">Comprehensive suite of validated tools for clinical decision support.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeCategory === cat.id 
                  ? "bg-clinical-blue text-white shadow-md shadow-blue-100 dark:shadow-none" 
                  : "bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-clinical-border dark:border-dark-border"
              )}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={cn("w-4 h-4", activeCategory === cat.id ? "text-white" : "text-slate-400")} />
                {cat.label}
              </div>
              <ChevronRight className={cn("w-4 h-4 opacity-50", activeCategory === cat.id ? "text-white" : "text-slate-300")} />
            </button>
          ))}

          <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3 text-xs">
              <Info className="w-3.5 h-3.5 text-clinical-blue" />
              Usage Guidelines
            </h3>
            <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculators are based on peer-reviewed literature. 
              Dose adjustments should always be cross-referenced with 
              institutional protocols and patient-specific factors.
            </p>
          </div>
        </div>

        {/* Main Calculator Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeCategory === 'dosing' && (
                <>
                  <BSACalculator />
                  <BMICalculator />
                  <CalvertCalculator />
                  <PerformanceStatusTool />
                </>
              )}

              {activeCategory === 'renal' && (
                <>
                  <CrClCalculator />
                  <ChildPughCalculator />
                </>
              )}

              {activeCategory === 'heme' && (
                <>
                  <ANCCalculator />
                </>
              )}

              {activeCategory === 'staging' && (
                <div className="md:col-span-2">
                  <AJCCStagingTool />
                </div>
              )}

              {activeCategory === 'toxicity' && (
                <div className="md:col-span-2">
                  <ToxicityGrader />
                </div>
              )}

              {activeCategory === 'cardiac' && (
                <>
                  <QTcCalculator />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
