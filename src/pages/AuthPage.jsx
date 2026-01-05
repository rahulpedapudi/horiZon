import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { loginWithGoogle } = useAuth();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4 font-sans text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-sm space-y-8 animate-fade-in text-center">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xl">
              H
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Horizon</h1>
          <p className="text-gray-500 dark:text-gray-400">
            A learning platform built for long-term relevance.
          </p>
        </div>

        {/* Auth Card */}
        <div className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">
                {error === "auth_failed"
                  ? "Authentication failed. Please try again."
                  : "Something went wrong. Please try again."}
              </p>
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={loginWithGoogle}
            className="w-full h-14 flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all font-medium text-[15px] shadow-sm hover:shadow-md">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="text-sm text-gray-400 dark:text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-900">
          <p className="text-xs text-gray-400">
            Secure authentication powered by Google OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
