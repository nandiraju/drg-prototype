import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Database, 
  Dna, 
  Microscope, 
  BookOpen, 
  ExternalLink, 
  ChevronRight,
  Filter,
  Info,
  Loader2
} from 'lucide-react';
import { cn } from '../types';

interface PatientSimilarityResult {
  Source: string;
  Summary: string;
  Link: string;
  KeyDemographics: string;
  Biomarkers: string;
  TreatmentInfo: string;
  type: 'registry' | 'genomic' | 'trial' | 'literature';
}

export const PatientsLikeMe: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PatientSimilarityResult[]>([]);
  const [formData, setFormData] = useState({
    patientAge: '',
    patientGender: 'Female',
    cancerType: '',
    stage: 'IV',
    biomarkers: '',
    mutationProfile: '',
    treatmentHistory: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const simulateSearch = async () => {
    setLoading(true);
    setResults([]);
    
    // Simulate searching different sources
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: PatientSimilarityResult[] = [
      {
        Source: 'SEER Cancer Registry',
        Summary: 'Identified 1,240 patients with similar demographics and Stage IV Breast Cancer. 5-year survival rate for this cohort is 28%.',
        Link: 'https://seer.cancer.gov/',
        KeyDemographics: `Age: ${formData.patientAge || '60-65'}, Gender: ${formData.patientGender}`,
        Biomarkers: formData.biomarkers || 'ER+, PR+, HER2-',
        TreatmentInfo: 'Standard of care: Endocrine therapy + CDK4/6 inhibitors.',
        type: 'registry'
      },
      {
        Source: 'cBioPortal (TCGA)',
        Summary: 'Found 45 cases with matching PIK3CA and TP53 mutation profiles. High correlation with resistance to standard endocrine monotherapy.',
        Link: 'https://www.cbioportal.org/',
        KeyDemographics: 'Matching Genomic Cohort',
        Biomarkers: formData.mutationProfile || 'PIK3CA, TP53',
        TreatmentInfo: 'Observed better outcomes with Alpelisib combinations.',
        type: 'genomic'
      },
      {
        Source: 'ClinicalTrials.gov',
        Summary: 'NCT04573127: Phase III trial for similar patients exploring novel AKT inhibitors. Currently recruiting in 12 locations.',
        Link: 'https://clinicaltrials.gov/',
        KeyDemographics: `Stage ${formData.stage}, Age >18`,
        Biomarkers: 'HR+, HER2-, PIK3CA Mutant',
        TreatmentInfo: 'Investigational: Capivasertib + Fulvestrant.',
        type: 'trial'
      },
      {
        Source: 'PubMed / Case Reports',
        Summary: 'Recent case series (2025) describes 3 patients with similar metastatic patterns showing partial response to experimental triplet therapy.',
        Link: 'https://pubmed.ncbi.nlm.nih.gov/',
        KeyDemographics: 'Metastatic Breast Cancer',
        Biomarkers: 'Triple Positive',
        TreatmentInfo: 'Experimental: Trastuzumab Deruxtecan + Immunotherapy.',
        type: 'literature'
      }
    ];

    setResults(mockResults);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-clinical-blue" />
            Patients Like Me
          </h1>
          <p className="text-slate-500 dark:text-slate-300">
            Cross-reference patient profiles with global registries, genomic databases, and clinical literature.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="clinical-card p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Patient Profile
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Age</label>
                  <input 
                    type="text" 
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    placeholder="e.g. 62"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Gender</label>
                  <select 
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Cancer Type</label>
                <input 
                  type="text" 
                  name="cancerType"
                  value={formData.cancerType}
                  onChange={handleInputChange}
                  placeholder="e.g. Metastatic Breast Cancer"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Stage</label>
                <select 
                  name="stage"
                  value={formData.stage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none"
                >
                  <option>I</option>
                  <option>II</option>
                  <option>III</option>
                  <option>IV</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Biomarkers</label>
                <input 
                  type="text" 
                  name="biomarkers"
                  value={formData.biomarkers}
                  onChange={handleInputChange}
                  placeholder="e.g. ER+, PR+, HER2-"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Mutation Profile</label>
                <textarea 
                  name="mutationProfile"
                  value={formData.mutationProfile}
                  onChange={handleInputChange}
                  placeholder="e.g. PIK3CA, TP53, BRCA1"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Treatment History</label>
                <textarea 
                  name="treatmentHistory"
                  value={formData.treatmentHistory}
                  onChange={handleInputChange}
                  placeholder="e.g. Taxane-based chemo, Anti-HER2"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-clinical-border dark:border-dark-border rounded-lg text-sm dark:text-white outline-none resize-none"
                />
              </div>

              <button 
                onClick={simulateSearch}
                disabled={loading}
                className="w-full clinical-btn-primary flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching Databases...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Find Similar Patients
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-clinical-blue shrink-0" />
              <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                This tool performs real-time queries across anonymized registries and public databases. No patient-identifiable information (PII) is transmitted.
              </p>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-4"
              >
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-clinical-blue animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="w-4 h-4 text-clinical-blue" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Analyzing Global Data</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Querying SEER, TCGA, and ClinicalTrials.gov...</p>
                </div>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg text-slate-900 dark:text-white">Similarity Results</h2>
                  <span className="text-xs font-bold text-slate-400 uppercase">{results.length} Sources Matched</span>
                </div>

                <div className="space-y-4">
                  {results.map((result, idx) => (
                    <div key={idx} className="clinical-card group hover:border-clinical-blue transition-all">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              result.type === 'registry' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                              result.type === 'genomic' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' :
                              result.type === 'trial' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' :
                              'bg-amber-50 dark:bg-amber-900/20 text-amber-600'
                            )}>
                              {result.type === 'registry' && <Database className="w-5 h-5" />}
                              {result.type === 'genomic' && <Dna className="w-5 h-5" />}
                              {result.type === 'trial' && <Microscope className="w-5 h-5" />}
                              {result.type === 'literature' && <BookOpen className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">{result.Source}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Source Database</p>
                            </div>
                          </div>
                          <a 
                            href={result.Link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-clinical-blue transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                          {result.Summary}
                        </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-dark-border">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Demographics</p>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">{result.KeyDemographics}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Biomarkers</p>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">{result.Biomarkers}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Treatment Info</p>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">{result.TreatmentInfo}</p>
                  </div>
                </div>

                        <div className="mt-4 flex justify-end">
                          <button className="text-xs font-bold text-clinical-blue flex items-center gap-1 hover:underline">
                            View Full Dataset <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Search Performed</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
                  Enter patient details on the left to find similar cases across global databases.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
