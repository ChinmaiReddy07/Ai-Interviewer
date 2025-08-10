import React from 'react';
import { X, Play, Users, Brain, BarChart3 } from 'lucide-react';
import { InteractiveDemoVideo } from './InteractiveDemoVideo';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  if (!isOpen) return null;

  const demoFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Questions",
      description: "Watch how our AI generates personalized interview questions based on your role and experience level."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real-time Interaction",
      description: "Experience seamless video communication with our virtual interviewer using WebRTC technology."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Instant Feedback",
      description: "See how our NLP algorithms analyze your responses and provide detailed performance insights."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Product Demo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        {/* Video Demo Section */}
        <div className="p-6">
          {!isVideoPlaying ? (
            <div className="bg-slate-900 rounded-2xl aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
              <div className="text-center z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 mb-4 inline-block">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Interactive Demo Video</h3>
                <p className="text-white/80 mb-4">See the AI Virtual Interviewer in action</p>
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                >
                  Play Demo
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <InteractiveDemoVideo onClose={() => setIsVideoPlaying(false)} />
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200"
                >
                  ← Back to Demo Info
                </button>
              </div>
            </div>
          )}

          {/* Features Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {demoFeatures.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="text-blue-600 mb-3 flex justify-center">{feature.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Demo Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">
              What You'll Experience in the Demo
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">5 min</div>
                <div className="text-slate-600 text-sm">Demo Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">3</div>
                <div className="text-slate-600 text-sm">Sample Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">Real-time</div>
                <div className="text-slate-600 text-sm">AI Feedback</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                <div className="text-slate-600 text-sm">Interactive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Try Full Version
            </button>
            <button
              onClick={onClose}
              className="border-2 border-slate-300 hover:border-blue-300 text-slate-700 hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Close Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};