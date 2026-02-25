import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, BookOpen, CheckCircle2, XCircle, ChevronRight, Trophy, RefreshCcw, ArrowLeft } from 'lucide-react';
import { cn } from '../types';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'breast',
    title: 'Breast Cancer',
    description: 'Test your knowledge on molecular subtypes, screening guidelines, and treatment paradigms.',
    icon: '🎀',
    questions: [
      {
        id: 'b1',
        text: 'Which molecular subtype of breast cancer typically has the best prognosis?',
        options: ['Luminal A', 'Luminal B', 'HER2-enriched', 'Basal-like (Triple Negative)'],
        correctAnswer: 0,
        explanation: 'Luminal A tumors are typically low-grade, ER/PR positive, and HER2 negative, generally associated with the best prognosis.'
      },
      {
        id: 'b2',
        text: 'What is the recommended duration of adjuvant endocrine therapy for high-risk HR+ early breast cancer according to current guidelines?',
        options: ['2 years', '5 years', '5-10 years', 'Lifetime'],
        correctAnswer: 2,
        explanation: 'Extended endocrine therapy (up to 10 years) is often recommended for patients at high risk of late recurrence.'
      }
    ]
  },
  {
    id: 'lung',
    title: 'Lung Cancer',
    description: 'Focus on NSCLC mutations, staging, and immunotherapy biomarkers.',
    icon: '🫁',
    questions: [
      {
        id: 'l1',
        text: 'Which mutation is most commonly associated with non-smokers who develop lung adenocarcinoma?',
        options: ['KRAS', 'EGFR', 'ALK', 'BRAF'],
        correctAnswer: 1,
        explanation: 'EGFR mutations are significantly more common in non-smokers, women, and patients of East Asian descent.'
      },
      {
        id: 'l2',
        text: 'What is the standard of care for Stage III unresectable NSCLC after definitive chemoradiation?',
        options: ['Observation', 'Adjuvant Cisplatin', 'Durvalumab consolidation', 'Pemetrexed maintenance'],
        correctAnswer: 2,
        explanation: 'Based on the PACIFIC trial, durvalumab consolidation is the standard of care for Stage III unresectable NSCLC that has not progressed after chemoradiation.'
      }
    ]
  },
  {
    id: 'prostate',
    title: 'Prostate Cancer',
    description: 'PSA kinetics, Gleason scoring, and metastatic castration-resistant prostate cancer (mCRPC).',
    icon: '🧬',
    questions: [
      {
        id: 'p1',
        text: 'A Gleason Score of 4+3 corresponds to which Grade Group?',
        options: ['Grade Group 1', 'Grade Group 2', 'Grade Group 3', 'Grade Group 4'],
        correctAnswer: 2,
        explanation: 'Gleason 3+4 is Grade Group 2, while Gleason 4+3 is Grade Group 3, reflecting a higher proportion of pattern 4 disease.'
      }
    ]
  },
  {
    id: 'liver',
    title: 'Liver Cancer (HCC)',
    description: 'BCLC staging, Child-Pugh assessment, and systemic therapy options.',
    icon: '🍷',
    questions: [
      {
        id: 'h1',
        text: 'Which scoring system is primarily used to determine eligibility for liver transplantation in HCC?',
        options: ['Child-Pugh', 'MELD', 'Milan Criteria', 'BCLC'],
        correctAnswer: 2,
        explanation: 'The Milan Criteria (single lesion ≤5cm or up to 3 lesions ≤3cm) are the standard for determining transplant eligibility.'
      }
    ]
  }
];

export const QuizPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === selectedTopic!.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < selectedTopic!.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-4xl mx-auto"
    >
      {!selectedTopic ? (
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-clinical-blue" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Clinical Knowledge Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Test your expertise in oncology with our evidence-based quizzes. Select a specialty to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUIZ_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className="clinical-card p-6 text-left hover:border-clinical-blue transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{topic.icon}</span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {topic.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-clinical-blue uppercase tracking-wider">
                  Start Quiz <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : showResults ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="clinical-card p-12 text-center space-y-6"
        >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full">
                      <Trophy className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Quiz Complete!</h2>
            <p className="text-slate-500 dark:text-slate-400">You scored {score} out of {selectedTopic.questions.length}</p>
          </div>
          
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(score / selectedTopic.questions.length) * 100}%` }}
              className="h-full bg-emerald-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button onClick={resetQuiz} className="clinical-btn-secondary flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Topics
            </button>
            <button onClick={() => handleTopicSelect(selectedTopic)} className="clinical-btn-primary flex items-center justify-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button onClick={resetQuiz} className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Exit Quiz
            </button>
            <div className="text-sm font-bold text-slate-400 dark:text-slate-500">
              Question {currentQuestionIndex + 1} of {selectedTopic.questions.length}
            </div>
          </div>

          <div className="clinical-card overflow-visible">
            <div className="h-1 bg-slate-100 dark:bg-slate-800">
              <motion.div 
                className="h-full bg-clinical-blue"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100}%` }}
              />
            </div>
            
            <div className="p-8 space-y-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedTopic.questions[currentQuestionIndex].text}
              </h2>

              <div className="space-y-3">
                {selectedTopic.questions[currentQuestionIndex].options.map((option, idx) => {
                  const isCorrect = idx === selectedTopic.questions[currentQuestionIndex].correctAnswer;
                  const isSelected = idx === selectedOption;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswered}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group",
                        !isAnswered && "border-slate-100 dark:border-slate-800 hover:border-clinical-blue hover:bg-blue-50 dark:hover:bg-blue-900/10",
                        isAnswered && isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
                        isAnswered && isSelected && !isCorrect && "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400",
                        isAnswered && !isCorrect && !isSelected && "opacity-50 border-slate-100 dark:border-slate-800"
                      )}
                    >
                      <span className="font-medium">{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-dark-border"
                  >
                    <div className="flex gap-3">
                      <BookOpen className="w-5 h-5 text-clinical-blue shrink-0" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Clinical Rationale</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {selectedTopic.questions[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isAnswered && (
                <button 
                  onClick={handleNext}
                  className="clinical-btn-primary w-full py-4 text-lg"
                >
                  {currentQuestionIndex + 1 === selectedTopic.questions.length ? 'See Results' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
