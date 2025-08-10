import React, { useState } from 'react';
import { X, Users, Zap, Gift, Mail, CheckCircle } from 'lucide-react';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BetaModal: React.FC<BetaModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        onClose();
      }, 2000);
    }
  };

  const betaFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Early Access",
      description: "Be among the first to experience cutting-edge AI interview technology"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Free Premium Features",
      description: "Access advanced analytics and unlimited practice sessions at no cost"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Direct Feedback Channel",
      description: "Shape the product with your feedback and feature requests"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Join Beta Program</h2>
              <p className="text-slate-600">Get exclusive early access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubscribed ? (
            <>
              {/* Beta Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
                  Beta Program Benefits
                </h3>
                <div className="space-y-4">
                  {betaFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                      <div className="text-purple-600 mt-1">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                        <p className="text-slate-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">2,847</div>
                    <div className="text-slate-600 text-sm">Beta Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600 mb-1">96%</div>
                    <div className="text-slate-600 text-sm">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600 mb-1">24/7</div>
                    <div className="text-slate-600 text-sm">Support</div>
                  </div>
                </div>
              </div>

              {/* Email Signup */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Join Beta Program
                </button>
              </form>

              <p className="text-slate-500 text-sm text-center mt-4">
                We'll send you an invitation within 24-48 hours. No spam, ever.
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Welcome to Beta!
              </h3>
              <p className="text-slate-600 mb-6">
                Thank you for joining our beta program. You'll receive an invitation email within 24-48 hours with access instructions.
              </p>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-blue-800 font-medium">
                  🎉 You're now part of an exclusive group of {Math.floor(Math.random() * 100) + 2800} beta testers!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};