import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (validTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setAnalysisComplete(false);
        } else {
            alert('Please upload a PDF or Word document.');
        }
    };

    const removeFile = () => {
        setFile(null);
        setAnalysisComplete(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                        <FileText size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Resume Analyzer
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Upload your resume to get AI-powered insights and improvement suggestions.
                    </p>
                </div>

                {/* Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
            relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
            ${isDragging
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          `}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                    />

                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <Upload size={32} />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        PDF, DOCX (Max 5MB)
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative z-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 flex items-center gap-4 text-left border border-blue-100 dark:border-blue-800"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300">
                                    <FileText size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                        {file.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <button
                                    onClick={removeFile}
                                    className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions */}
                <AnimatePresence>
                    {file && !analysisComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-8 flex justify-center"
                        >
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className={`
                  relative px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 transition-all
                  ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 active:scale-95'}
                `}
                            >
                                {isAnalyzing ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </span>
                                ) : (
                                    'Analyze Resume'
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Placeholder */}
                <AnimatePresence>
                    {analysisComplete && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-8 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-xl p-6"
                        >
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-green-700 dark:text-green-400">Analysis Complete!</h3>
                                    <p className="text-green-600 dark:text-green-500/80 text-sm mt-1">
                                        Your resume has been processed. Detailed insights would appear here.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ResumeAnalyzer;
