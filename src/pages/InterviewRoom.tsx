import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { VideoInterface } from '../components/VideoInterface';
import { QuestionPanel } from '../components/QuestionPanel';
import { ControlPanel } from '../components/ControlPanel';
import { ProgressBar } from '../components/ProgressBar';

export const InterviewRoom: React.FC = () => {
  const navigate = useNavigate();
  const { interviewConfig, setInterviewResults } = useInterview();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(interviewConfig?.duration ? interviewConfig.duration * 60 : 1800);
  const [answers, setAnswers] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const questions = [
    "Tell me about yourself and your professional background.",
    "Why are you interested in this position?",
    "Describe a challenging project you worked on recently.",
    "How do you handle working under pressure?",
    "Where do you see yourself in 5 years?",
    "What's your greatest professional achievement?",
    "How do you handle conflicts with team members?",
    "What motivates you in your work?"
  ];

  useEffect(() => {
    if (!interviewConfig) {
      navigate('/setup');
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleEndInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interviewConfig, navigate]);

  const handleAnswerSubmit = (answer: string) => {
    setAnswers(prev => [...prev, answer]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleEndInterview();
    }
  };

  const handleEndInterview = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setInterviewResults({
      answers,
      questions: questions.slice(0, currentQuestion + 1),
      totalTime: (interviewConfig?.duration || 30) * 60 - timeRemaining,
      completionRate: ((currentQuestion + 1) / questions.length) * 100
    });
    
    navigate('/feedback');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!interviewConfig) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">
              Interview: {interviewConfig.jobTitle}
            </h1>
            <p className="text-slate-400 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-slate-400 text-sm">Time Remaining</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        current={currentQuestion + 1} 
        total={questions.length} 
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Video Interface */}
          <div className="lg:col-span-2">
            <VideoInterface 
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
            />
          </div>

          {/* Question and Controls */}
          <div className="space-y-6">
            <QuestionPanel
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswerSubmit={handleAnswerSubmit}
              isRecording={isRecording}
            />
            
            <ControlPanel
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
              onEndInterview={handleEndInterview}
              onNextQuestion={() => {
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(prev => prev + 1);
                }
              }}
              canGoNext={currentQuestion < questions.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};