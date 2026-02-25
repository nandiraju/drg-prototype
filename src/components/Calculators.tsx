import React, { useState } from 'react';
import { Calculator as CalcIcon, Info, Activity } from 'lucide-react';
import { cn } from '../types';

export const BSACalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bsa, setBsa] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      // Mosteller formula: BSA = sqrt( (height in cm * weight in kg) / 3600 )
      const result = Math.sqrt((h * w) / 3600);
      setBsa(result);
    }
  };

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">BSA Calculator (Mosteller)</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Weight (kg)</label>
          <input 
            type="number" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-clinical-blue outline-none"
            placeholder="e.g. 70"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Height (cm)</label>
          <input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-clinical-blue outline-none"
            placeholder="e.g. 175"
          />
        </div>

        <button 
          onClick={calculate}
          className="clinical-btn-primary w-full mt-2"
        >
          Calculate BSA
        </button>

        {bsa !== null && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Calculated BSA</p>
            <p className="text-3xl font-bold text-clinical-blue">{bsa.toFixed(2)} <span className="text-lg font-medium">m²</span></p>
          </div>
        )}

        <div className="flex items-start gap-2 mt-4 text-[10px] text-slate-400">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          <p>Formula: √([Height(cm) × Weight(kg)] / 3600). Used for chemotherapy dosing.</p>
        </div>
      </div>
    </div>
  );
};

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w > 0 && h > 0) {
      setBmi(w / (h * h));
    }
  };

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">BMI Calculator</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="kg" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="cm" />
          </div>
        </div>
        <button onClick={calculate} className="clinical-btn-primary w-full">Calculate BMI</button>
        {bmi !== null && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Calculated BMI</p>
            <p className="text-2xl font-bold text-clinical-blue">{bmi.toFixed(1)} <span className="text-sm font-medium">kg/m²</span></p>
            <p className="text-[10px] font-bold mt-2 uppercase text-slate-500 dark:text-slate-400">
              {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ANCCalculator: React.FC = () => {
  const [wbc, setWbc] = useState<string>('');
  const [neutroPercent, setNeutroPercent] = useState<string>('');
  const [bandPercent, setBandPercent] = useState<string>('');
  const [anc, setAnc] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(wbc);
    const n = parseFloat(neutroPercent);
    const b = parseFloat(bandPercent) || 0;
    if (w > 0 && n >= 0) {
      // ANC = WBC * (% Neutrophils + % Bands) / 100
      const result = (w * 1000 * (n + b)) / 100;
      setAnc(result);
    }
  };

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">ANC Calculator</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">WBC (x10³/µL)</label>
          <input type="number" step="0.1" value={wbc} onChange={(e) => setWbc(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="e.g. 4.5" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Neutrophils (%)</label>
            <input type="number" value={neutroPercent} onChange={(e) => setNeutroPercent(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="%" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Bands (%)</label>
            <input type="number" value={bandPercent} onChange={(e) => setBandPercent(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="%" />
          </div>
        </div>
        <button onClick={calculate} className="clinical-btn-primary w-full">Calculate ANC</button>
        {anc !== null && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Calculated ANC</p>
            <p className="text-2xl font-bold text-clinical-blue">{anc.toFixed(0)} <span className="text-sm font-medium">cells/µL</span></p>
            <p className={cn("text-[10px] font-bold mt-2 uppercase", anc < 500 ? 'text-rose-600' : anc < 1000 ? 'text-amber-600' : 'text-emerald-600')}>
              {anc < 500 ? 'Severe Neutropenia' : anc < 1000 ? 'Moderate Neutropenia' : anc < 1500 ? 'Mild Neutropenia' : 'Normal'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const CalvertCalculator: React.FC = () => {
  const [targetAuc, setTargetAuc] = useState<string>('');
  const [gfr, setGfr] = useState<string>('');
  const [dose, setDose] = useState<number | null>(null);

  const calculate = () => {
    const auc = parseFloat(targetAuc);
    const g = parseFloat(gfr);
    if (auc > 0 && g > 0) {
      // Dose (mg) = Target AUC * (GFR + 25)
      const result = auc * (g + 25);
      setDose(result);
    }
  };

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">Carboplatin (Calvert)</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Target AUC</label>
          <input type="number" value={targetAuc} onChange={(e) => setTargetAuc(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="e.g. 5" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">GFR / CrCl (mL/min)</label>
          <input type="number" value={gfr} onChange={(e) => setGfr(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="e.g. 80" />
        </div>
        <button onClick={calculate} className="clinical-btn-primary w-full">Calculate Dose</button>
        {dose !== null && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-center">
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Total Carboplatin Dose</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{dose.toFixed(0)} <span className="text-sm font-medium">mg</span></p>
          </div>
        )}
        <div className="flex items-start gap-2 text-[10px] text-slate-400">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          <p>Formula: Dose = AUC × (GFR + 25). GFR is often capped at 125 mL/min.</p>
        </div>
      </div>
    </div>
  );
};

export const ChildPughCalculator: React.FC = () => {
  const [bilirubin, setBilirubin] = useState<string>('');
  const [albumin, setAlbumin] = useState<string>('');
  const [inr, setInr] = useState<string>('');
  const [ascites, setAscites] = useState<number>(1);
  const [encephalopathy, setEncephalopathy] = useState<number>(1);

  const calculateScore = () => {
    let score = 0;
    const b = parseFloat(bilirubin);
    const a = parseFloat(albumin);
    const i = parseFloat(inr);

    if (b < 2) score += 1; else if (b <= 3) score += 2; else score += 3;
    if (a > 3.5) score += 1; else if (a >= 2.8) score += 2; else score += 3;
    if (i < 1.7) score += 1; else if (i <= 2.3) score += 2; else score += 3;
    score += ascites + encephalopathy;

    return score;
  };

  const score = calculateScore();
  const getGrade = (s: number) => {
    if (s <= 6) return { grade: 'A', survival: '100% (1yr)' };
    if (s <= 9) return { grade: 'B', survival: '80% (1yr)' };
    return { grade: 'C', survival: '45% (1yr)' };
  };

  const result = getGrade(score);

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">Child-Pugh Score</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Bilirubin</label>
            <input type="number" value={bilirubin} onChange={(e) => setBilirubin(e.target.value)} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded text-xs outline-none" placeholder="mg/dL" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Albumin</label>
            <input type="number" value={albumin} onChange={(e) => setAlbumin(e.target.value)} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded text-xs outline-none" placeholder="g/dL" />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">INR</label>
            <input type="number" value={inr} onChange={(e) => setInr(e.target.value)} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded text-xs outline-none" placeholder="ratio" />
          </div>
        </div>
        <div>
          <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Ascites</label>
          <select value={ascites} onChange={(e) => setAscites(parseInt(e.target.value))} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded text-xs outline-none">
            <option value={1}>None</option>
            <option value={2}>Slight / Controlled</option>
            <option value={3}>Moderate / Severe</option>
          </select>
        </div>
        <div>
          <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Encephalopathy</label>
          <select value={encephalopathy} onChange={(e) => setEncephalopathy(parseInt(e.target.value))} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded text-xs outline-none">
            <option value={1}>None</option>
            <option value={2}>Grade 1-2</option>
            <option value={3}>Grade 3-4</option>
          </select>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">Child-Pugh Class</p>
          <p className="text-3xl font-black text-clinical-blue my-1">{result.grade}</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Score: {score} • Est. Survival: {result.survival}</p>
        </div>
      </div>
    </div>
  );
};

export const PerformanceStatusTool: React.FC = () => {
  const [ecog, setEcog] = useState<number>(0);

  const ecogLevels = [
    { value: 0, label: 'Fully active, able to carry on all pre-disease performance without restriction.' },
    { value: 1, label: 'Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature.' },
    { value: 2, label: 'Ambulatory and capable of all selfcare but unable to carry out any work activities; up and about more than 50% of waking hours.' },
    { value: 3, label: 'Capable of only limited selfcare; confined to bed or chair more than 50% of waking hours.' },
    { value: 4, label: 'Completely disabled; cannot carry on any selfcare; totally confined to bed or chair.' },
    { value: 5, label: 'Dead.' },
  ];

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">ECOG Performance Status</h3>
      </div>
      <div className="space-y-2">
        {ecogLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => setEcog(level.value)}
            className={cn(
              "w-full text-left p-3 rounded-xl border transition-all",
              ecog === level.value 
                ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 ring-2 ring-blue-100 dark:ring-blue-900/20" 
                : "bg-white dark:bg-slate-800 border-clinical-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white">ECOG {level.value}</span>
              {ecog === level.value && <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{level.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export const CrClCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [creatinine, setCreatinine] = useState<string>('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [crcl, setCrcl] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const cr = parseFloat(creatinine);
    if (a > 0 && w > 0 && cr > 0) {
      // Cockcroft-Gault formula
      let result = ((140 - a) * w) / (72 * cr);
      if (gender === 'Female') result *= 0.85;
      setCrcl(result);
    }
  };

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">CrCl (Cockcroft-Gault)</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="Years" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="kg" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Serum Creatinine (mg/dL)</label>
          <input type="number" step="0.1" value={creatinine} onChange={(e) => setCreatinine(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="e.g. 1.1" />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={gender === 'Male'} onChange={() => setGender('Male')} className="text-clinical-blue" />
            <span className="text-sm text-slate-700 dark:text-slate-300">Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={gender === 'Female'} onChange={() => setGender('Female')} className="text-clinical-blue" />
            <span className="text-sm text-slate-700 dark:text-slate-300">Female</span>
          </label>
        </div>

        <button onClick={calculate} className="clinical-btn-primary w-full">Calculate CrCl</button>

        {crcl !== null && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Calculated CrCl</p>
            <p className="text-2xl font-bold text-clinical-blue">{crcl.toFixed(1)} <span className="text-sm font-medium">mL/min</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export const QTcCalculator: React.FC = () => {
  const [qt, setQt] = useState<string>('');
  const [hr, setHr] = useState<string>('');
  const [qtc, setQtc] = useState<number | null>(null);

  const calculate = () => {
    const q = parseFloat(qt);
    const h = parseFloat(hr);
    if (q > 0 && h > 0) {
      // Bazett's Formula: QTc = QT / sqrt(RR) where RR = 60 / HR
      const rr = 60 / h;
      const result = q / Math.sqrt(rr);
      setQtc(result);
    }
  };

  return (
    <div className="clinical-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalcIcon className="w-5 h-5 text-clinical-blue" />
        <h3 className="font-bold text-slate-900 dark:text-white">QTc (Bazett)</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">QT (ms)</label>
            <input type="number" value={qt} onChange={(e) => setQt(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="ms" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Heart Rate (bpm)</label>
            <input type="number" value={hr} onChange={(e) => setHr(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-clinical-border dark:border-dark-border dark:text-white rounded-lg text-sm outline-none" placeholder="bpm" />
          </div>
        </div>
        <button onClick={calculate} className="clinical-btn-primary w-full">Calculate QTc</button>
        {qtc !== null && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Calculated QTc</p>
            <p className="text-2xl font-bold text-clinical-blue">{qtc.toFixed(0)} <span className="text-sm font-medium">ms</span></p>
            <p className={cn("text-[10px] font-bold mt-2 uppercase", qtc > 500 ? 'text-rose-600' : qtc > 450 ? 'text-amber-600' : 'text-emerald-600')}>
              {qtc > 500 ? 'High Risk' : qtc > 450 ? 'Borderline' : 'Normal'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
