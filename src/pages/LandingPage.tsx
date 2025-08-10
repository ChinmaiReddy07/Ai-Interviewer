import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Brain, BarChart3, MessageSquare, Trophy, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {

  const features = [
    {
      icon: <Video className="h-8 w-8" />,
      title: "Real-time Video Interview",
      description: "Experience realistic interview conditions with WebRTC video technology"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Questions",
      description: "Dynamic question generation tailored to your role and experience level"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Speech Recognition",
      description: "Advanced speech-to-text conversion for accurate answer capture"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Detailed Analytics",
      description: "Comprehensive performance metrics and improvement recommendations"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Performance Scoring",
      description: "AI evaluation with detailed feedback on communication skills"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Feedback",
      description: "Real-time coaching and suggestions during practice sessions"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Master Your Next
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Interview
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Practice with our AI-powered virtual interviewer. Get real-time feedback, 
            improve your communication skills, and land your dream job with confidence.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/setup"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Start Practicing Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-slate-600">Practice Sessions</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
            <div className="text-slate-600">Success Rate</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
            <div className="text-slate-600">User Rating</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Interview?</h2>
        <p className="text-xl opacity-90 mb-8">
          Join thousands of professionals who have improved their interview skills
        </p>
        <Link
          to="/setup"
          className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span>Get Started Free</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};