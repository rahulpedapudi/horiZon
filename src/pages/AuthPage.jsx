import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isLogin) {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
    }

    if (isLogin) {
      login(email, password);
    } else {
      signup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4 font-sans text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-sm space-y-8 animate-fade-in text-center">
        
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xl">
               F
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">FutureHub</h1>
          <p className="text-gray-500 dark:text-gray-400">A learning platform built for long-term relevance.</p>
        </div>

        {/* Auth Card */}
        <div className="space-y-6">
          <div className="space-y-4">
             {/* Google Button Mock */}
             <button 
               className="w-full h-12 flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-[15px]"
               onClick={() => setError('Google auth is mocked for now.')}
             >
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
               Continue with Google
             </button>
             
             <div className="relative flex items-center justify-center">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
               </div>
               <div className="relative bg-white dark:bg-gray-950 px-4 text-xs text-gray-400 uppercase">Or</div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 dark:text-white"
                />
              </div>
            )}
            
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 dark:text-white"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 dark:text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-semibold rounded-lg transition-all shadow-sm"
            >
              {isLogin ? 'Continue' : 'Create Account'}
            </button>
          </form>

          {!isLogin && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We'll personalize your learning experience next.
            </p>
          )}

          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-gray-900 dark:text-white font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
