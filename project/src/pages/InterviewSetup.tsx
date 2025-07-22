import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Play, Upload, User, Briefcase, Clock, Target } from 'lucide-react';

export const InterviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const { setInterviewConfig } = useInterview();
  
  const [config, setConfig] = useState({
    jobTitle: '',
    company: '',
    experienceLevel: 'mid',
    interviewType: 'behavioral',
    duration: 30,
    difficulty: 'medium'
  });

  const handleStart = () => {
    setInterviewConfig(config);
    navigate('/interview');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Set Up Your Interview
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Customize your practice session to match your target role and get personalized questions
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Briefcase className="h-4 w-4" />
                <span>Job Title</span>
              </label>
              <input
                type="text"
                value={config.jobTitle}
                onChange={(e) => setConfig(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <User className="h-4 w-4" />
                <span>Company (Optional)</span>
              </label>
              <input
                type="text"
                value={config.company}
                onChange={(e) => setConfig(prev => ({ ...prev, company: e.target.value }))}
                placeholder="e.g., Google, Meta, Apple"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Target className="h-4 w-4" />
                <span>Experience Level</span>
              </label>
              <select
                value={config.experienceLevel}
                onChange={(e) => setConfig(prev => ({ ...prev, experienceLevel: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6+ years)</option>
                <option value="lead">Lead/Manager (8+ years)</option>
              </select>
            </div>
          </div>

          {/* Interview Settings */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Play className="h-4 w-4" />
                <span>Interview Type</span>
              </label>
              <select
                value={config.interviewType}
                onChange={(e) => setConfig(prev => ({ ...prev, interviewType: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="behavioral">Behavioral</option>
                <option value="technical">Technical</option>
                <option value="system-design">System Design</option>
                <option value="case-study">Case Study</option>
                <option value="mixed">Mixed Interview</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Clock className="h-4 w-4" />
                <span>Duration</span>
              </label>
              <select
                value={config.duration}
                onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfig(prev => ({ ...prev, difficulty: level }))}
                    className={`py-3 px-4 rounded-xl font-medium capitalize transition-all duration-200 ${
                      config.difficulty === level
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="mt-8 p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center hover:border-blue-400 transition-colors duration-200">
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Upload Your Resume (Optional)
          </h3>
          <p className="text-slate-500 mb-4">
            Upload your resume for personalized questions based on your experience
          </p>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            Choose File
          </button>
        </div>

        {/* Start Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleStart}
            disabled={!config.jobTitle}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white px-12 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            <Play className="h-5 w-5" />
            <span>Start Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
};