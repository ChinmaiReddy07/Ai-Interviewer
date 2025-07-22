import React from 'react';
import { Link } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Trophy, Clock, Target, TrendingUp, ArrowRight, RotateCcw } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const { interviewResults, interviewConfig } = useInterview();

  if (!interviewResults || !interviewConfig) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">No Results Available</h1>
        <Link to="/setup" className="text-blue-600 hover:underline">
          Start a new interview
        </Link>
      </div>
    );
  }

  const overallScore = Math.round(
    (interviewResults.completionRate * 0.3) + 
    (Math.random() * 30 + 55) // Simulated scoring algorithm
  );

  const feedback = {
    strengths: [
      "Clear and articulate communication",
      "Good use of specific examples",
      "Confident delivery and tone",
      "Well-structured responses"
    ],
    improvements: [
      "Could elaborate more on technical details",
      "Consider using the STAR method more consistently",
      "Practice maintaining eye contact",
      "Work on reducing filler words"
    ],
    recommendations: [
      "Research more about the company's recent projects",
      "Prepare more quantified achievements",
      "Practice behavioral questions with specific examples",
      "Work on your closing questions for the interviewer"
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(overallScore)} mb-6`}>
          <Trophy className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Interview Complete!
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Here's your detailed performance analysis
        </p>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore).split(' ')[0]} mb-2`}>
              {overallScore}%
            </div>
            <div className="text-sm text-slate-500">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-slate-700 mb-2">
              {getScoreLabel(overallScore)}
            </div>
            <div className="text-sm text-slate-500">Performance</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 text-center">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {Math.floor(interviewResults.totalTime / 60)}m {interviewResults.totalTime % 60}s
          </div>
          <div className="text-sm text-slate-500">Total Time</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 text-center">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {Math.round(interviewResults.completionRate)}%
          </div>
          <div className="text-sm text-slate-500">Completion Rate</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 text-center">
          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {interviewResults.questions.length}
          </div>
          <div className="text-sm text-slate-500">Questions Answered</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 text-center">
          <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {Math.round(Math.random() * 20 + 120)}
          </div>
          <div className="text-sm text-slate-500">Words per Minute</div>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Strengths */}
        <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            💪 Strengths
          </h2>
          <ul className="space-y-3">
            {feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-green-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">
            🎯 Areas for Improvement
          </h2>
          <ul className="space-y-3">
            {feedback.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-yellow-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            💡 Recommendations
          </h2>
          <ul className="space-y-3">
            {feedback.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-blue-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/setup"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Practice Again</span>
          </Link>
          <button className="border-2 border-slate-300 hover:border-blue-300 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200">
            <span>Download Report</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <p className="text-slate-500 text-sm">
          Keep practicing to improve your interview skills and confidence
        </p>
      </div>
    </div>
  );
};