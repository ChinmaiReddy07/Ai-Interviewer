import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface InteractiveDemoVideoProps {
  onClose?: () => void;
}

export const InteractiveDemoVideo: React.FC<InteractiveDemoVideoProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes demo
  const [isMuted, setIsMuted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const demoScenes = [
    {
      title: "Welcome & Setup",
      description: "Setting up your interview preferences",
      timestamp: 0,
      duration: 30,
      features: ["Job role selection", "Experience level", "Interview type"]
    },
    {
      title: "AI Interview Session",
      description: "Real-time interaction with AI interviewer",
      timestamp: 30,
      duration: 90,
      features: ["Dynamic questions", "Speech recognition", "Real-time feedback"]
    },
    {
      title: "Performance Analysis",
      description: "Detailed feedback and recommendations",
      timestamp: 120,
      duration: 60,
      features: ["Scoring system", "Improvement areas", "Next steps"]
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          
          // Update current scene based on timestamp
          const sceneIndex = demoScenes.findIndex(scene => 
            newTime >= scene.timestamp && newTime < scene.timestamp + scene.duration
          );
          if (sceneIndex !== -1 && sceneIndex !== currentScene) {
            setCurrentScene(sceneIndex);
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentScene, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const restart = () => {
    setCurrentTime(0);
    setCurrentScene(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;
  const currentSceneData = demoScenes[currentScene];

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden">
      {/* Video Display Area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Simulated Video Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {currentScene === 0 && (
            <div className="text-center text-white p-8">
              <div className="bg-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
                <h3 className="text-2xl font-bold mb-4">Interview Setup</h3>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-left">
                      <label className="text-sm text-slate-300">Job Title</label>
                      <div className="bg-slate-600 rounded p-2 mt-1">Senior Software Engineer</div>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-left">
                      <label className="text-sm text-slate-300">Experience Level</label>
                      <div className="bg-slate-600 rounded p-2 mt-1">Mid Level (3-5 years)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScene === 1 && (
            <div className="text-center text-white p-8">
              <div className="grid grid-cols-2 gap-8 h-full">
                {/* Candidate Video */}
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg h-48 flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">👤</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">You</p>
                </div>

                {/* AI Interviewer */}
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-lg h-48 flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">AI Interviewer</p>
                </div>
              </div>

              {/* Question Display */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-xl p-4">
                <p className="text-lg font-medium">
                  "Tell me about a challenging project you worked on recently and how you overcame the obstacles."
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-slate-400">Question 2 of 8</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-400">Recording</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScene === 2 && (
            <div className="text-center text-white p-8">
              <div className="bg-green-600/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
                <h3 className="text-2xl font-bold mb-6">Performance Analysis</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">87%</div>
                    <div className="text-sm text-slate-300">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">8/8</div>
                    <div className="text-sm text-slate-300">Questions Answered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">142</div>
                    <div className="text-sm text-slate-300">Words/Min</div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="bg-slate-700/50 rounded-lg p-3 text-left">
                    <div className="text-green-400 font-medium">✓ Strengths</div>
                    <div className="text-sm text-slate-300">Clear communication, specific examples</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3 text-left">
                    <div className="text-yellow-400 font-medium">⚡ Improvements</div>
                    <div className="text-sm text-slate-300">Consider using STAR method more consistently</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Play/Pause Overlay */}
        {!isPlaying && currentTime < duration && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-6 transition-all duration-200"
            >
              <Play className="h-12 w-12 text-white ml-1" />
            </button>
          </div>
        )}

        {/* Scene Info */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-white text-sm font-medium">{currentSceneData.title}</div>
          <div className="text-white/70 text-xs">{currentSceneData.description}</div>
        </div>

        {/* Time Display */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-white text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">Demo Progress</span>
            <span className="text-slate-400 text-xs">
              Scene {currentScene + 1} of {demoScenes.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button
              onClick={restart}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            <button
              onClick={toggleMute}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Current Scene Features */}
        <div className="mt-4 bg-slate-700/50 rounded-lg p-3">
          <div className="text-white text-sm font-medium mb-2">
            Current Scene Features:
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSceneData.features.map((feature, index) => (
              <span
                key={index}
                className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};