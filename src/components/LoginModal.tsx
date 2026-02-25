import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate brief auth animation then dismiss
    setTimeout(() => {
      onLogin();
    }, 900);
  };

  const handleQuickAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 600);
  };

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          id="login-overlay"
          key="login-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="login-overlay"
        >
          {/* Animated background blobs */}
          <div className="login-bg-blob login-bg-blob-1" />
          <div className="login-bg-blob login-bg-blob-2" />
          <div className="login-bg-blob login-bg-blob-3" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="login-card"
          >
            {/* Logo / Branding */}
            <div className="login-header">
              <motion.div
                className="login-logo"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Microscope className="login-logo-icon" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
              >
                <h1 className="login-title">
                  Dr.<span className="login-title-accent">G</span>
                </h1>
                <p className="login-subtitle">Clinical Decision Support Platform</p>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="login-divider" />

            {/* Form */}
            <motion.form
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="login-form"
            >
              <p className="login-welcome">Welcome back, Doctor</p>
              <p className="login-instructions">Sign in to access your clinical workspace.</p>

              {/* Username */}
              <div className="login-input-group">
                <label className="login-label">Username / NPI</label>
                <div className="login-input-wrap">
                  <User className="login-input-icon" />
                  <input
                    id="login-username"
                    type="text"
                    placeholder="dr.sarah.chen"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoFocus
                    className="login-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-input-group">
                <label className="login-label">Password</label>
                <div className="login-input-wrap">
                  <Lock className="login-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="login-input login-input-pwd"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-eye-btn"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="login-forgot-row">
                <button type="button" className="login-forgot-link">Forgot password?</button>
              </div>

              {/* Sign in button */}
              <button
                id="login-submit"
                type="submit"
                disabled={isLoading}
                className="login-btn-primary"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="login-spinner"
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Quick demo access */}
              <button
                type="button"
                id="login-demo-access"
                onClick={handleQuickAccess}
                disabled={isLoading}
                className="login-btn-demo"
              >
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                Continue as Demo User
              </button>
            </motion.form>

            {/* Footer note */}
            <motion.p
              className="login-footer-note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              For authorized healthcare professionals only. All activity is logged and monitored.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
