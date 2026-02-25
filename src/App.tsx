import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { Dashboard } from './pages/Dashboard';
import { PatientProfile } from './pages/PatientProfile';
import { PatientList } from './pages/PatientList';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { TrialsPage } from './pages/TrialsPage';
import { ReportsPage } from './pages/ReportsPage';
import { DrugDatabase } from './pages/DrugDatabase';
import { Analytics } from './pages/Analytics';
import { QuizPage } from './pages/QuizPage';
import { OrderWizard } from './pages/OrderWizard';
import { PatientsLikeMe } from './pages/PatientsLikeMe';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {/* Login overlay — rendered above everything, dismissed on sign-in */}
      <AnimatePresence>
        {!isLoggedIn && (
          <LoginModal key="login" onLogin={() => setIsLoggedIn(true)} />
        )}
      </AnimatePresence>

      {/* Main app shell — visible behind login overlay */}
      <div className="min-h-screen flex transition-colors duration-200 bg-clinical-bg dark:bg-dark-bg">
        <Sidebar onLogout={() => setIsLoggedIn(false)} />

        <div className="flex-1 flex flex-col min-w-0 bg-clinical-bg dark:bg-dark-bg">
          <Navbar />

          <main className="flex-1 bg-clinical-bg dark:bg-dark-bg">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/:id" element={<PatientProfile />} />
                <Route path="/orders" element={<OrderWizard />} />
                <Route path="/calculators" element={<CalculatorsPage />} />
                <Route path="/trials" element={<TrialsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/drugs" element={<DrugDatabase />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/patients-like-me" element={<PatientsLikeMe />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center h-full py-20 px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Page Under Development</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">This module is currently being implemented.</p>
                    <a href="/" className="mt-6 clinical-btn-primary">Return to Dashboard</a>
                  </div>
                } />
              </Routes>
            </AnimatePresence>
          </main>

          <footer className="bg-white dark:bg-dark-card border-t border-clinical-border dark:border-dark-border py-6 px-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">© 2026 Dr.G Clinical Decision Support. For professional use only.</p>
              <div className="flex gap-6">
                <a href="#" className="text-xs text-slate-400 dark:text-slate-500 hover:text-clinical-blue transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs text-slate-400 dark:text-slate-500 hover:text-clinical-blue transition-colors">Terms of Service</a>
                <a href="#" className="text-xs text-slate-400 dark:text-slate-500 hover:text-clinical-blue transition-colors">Support</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
