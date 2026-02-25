import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, Search, Beaker, Dna, Activity, 
  Stethoscope, ChevronRight, CheckCircle2, AlertCircle,
  Plus, Trash2, Send, FileText, Microscope
} from 'lucide-react';
import { cn } from '../types';

interface TestItem {
  id: string;
  name: string;
  category: 'Blood' | 'Genomics' | 'Imaging' | 'Pathology';
  description: string;
  price?: string;
}

const AVAILABLE_TESTS: TestItem[] = [
  // Blood Work
  { id: 'cbc', name: 'Complete Blood Count (CBC)', category: 'Blood', description: 'WBC, RBC, Hgb, Hct, Plt with differential.' },
  { id: 'lft', name: 'Liver Function Tests (LFT)', category: 'Blood', description: 'ALT, AST, ALP, Albumin, Bilirubin.' },
  { id: 'cmp', name: 'Comprehensive Metabolic Panel (CMP)', category: 'Blood', description: 'Electrolytes, glucose, kidney/liver function.' },
  { id: 'tumor-markers', name: 'Tumor Markers (CEA, CA-125, PSA)', category: 'Blood', description: 'Specific markers based on cancer type.' },
  
  // Genomics
  { id: 'ngs-solid', name: 'NGS Solid Tumor Panel', category: 'Genomics', description: 'Comprehensive 500+ gene panel for mutations/fusions.' },
  { id: 'liquid-biopsy', name: 'Liquid Biopsy (ctDNA)', category: 'Genomics', description: 'Non-invasive genetic profiling via blood.' },
  { id: 'brca', name: 'BRCA1/2 Germline Testing', category: 'Genomics', description: 'Hereditary cancer risk assessment.' },
  { id: 'pdl1', name: 'PD-L1 Expression (IHC)', category: 'Genomics', description: 'Predictive biomarker for immunotherapy.' },

  // Imaging
  { id: 'ct-chest', name: 'CT Chest/Abdomen/Pelvis', category: 'Imaging', description: 'Staging and response assessment.' },
  { id: 'pet-ct', name: 'PET-CT (FDG)', category: 'Imaging', description: 'Metabolic activity assessment.' },
  { id: 'mri-brain', name: 'MRI Brain with Contrast', category: 'Imaging', description: 'Rule out CNS involvement.' },

  // Pathology
  { id: 'core-biopsy', name: 'Core Needle Biopsy', category: 'Pathology', description: 'Tissue acquisition for diagnosis.' },
  { id: 'fna', name: 'Fine Needle Aspiration (FNA)', category: 'Pathology', description: 'Cytological assessment.' },
];

export const OrderWizard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<TestItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const filteredTests = AVAILABLE_TESTS.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (test: TestItem) => {
    if (!cart.find(item => item.id === test.id)) {
      setCart([...cart, test]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
      setCart([]);
    }, 1500);
  };

  const categories = ['All', 'Blood', 'Genomics', 'Imaging', 'Pathology'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Wizard</h1>
          <p className="text-slate-500 dark:text-slate-400">Select and order diagnostic tests for your patients.</p>
        </div>
        
        {cart.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {cart.length} test{cart.length > 1 ? 's' : ''} selected
            </span>
            <button 
              onClick={() => setCart([])}
              className="text-xs font-bold text-rose-500 uppercase hover:underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Test Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="clinical-card p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search tests, biomarkers, genes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-transparent dark:text-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                    selectedCategory === cat 
                      ? "bg-clinical-blue text-white" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTests.map((test) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={test.id}
                  className="clinical-card p-5 group hover:border-clinical-blue transition-all cursor-pointer"
                  onClick={() => addToCart(test)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                      test.category === 'Blood' && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
                      test.category === 'Genomics' && "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
                      test.category === 'Imaging' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                      test.category === 'Pathology' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    )}>
                      {test.category}
                    </span>
                    <Plus className={cn(
                      "w-4 h-4 transition-all",
                      cart.find(item => item.id === test.id) ? "text-emerald-500 rotate-45" : "text-slate-300 group-hover:text-clinical-blue"
                    )} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{test.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{test.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="clinical-card sticky top-24">
            <div className="p-6 border-b border-clinical-border dark:border-dark-border">
              <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-clinical-blue" />
                Order Summary
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <Beaker className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">No tests selected yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-dark-border group">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="pt-4 space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-clinical-blue mt-0.5" />
                      <p className="text-[10px] text-blue-700 dark:text-blue-400 leading-relaxed">
                        Orders will be sent to the central laboratory and imaging center. Turnaround time varies by test category.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="clinical-btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <RefreshCcw className="w-5 h-5" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Order
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-card p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-slate-100 dark:border-dark-border"
            >
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Submitted!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Your diagnostic orders have been successfully transmitted. You can track status in the Reports section.
              </p>
              <button 
                onClick={() => setOrderConfirmed(false)}
                className="clinical-btn-primary w-full py-3"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RefreshCcw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
    <path d="M16 16h5v5"/>
  </svg>
);
