import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, Send } from 'lucide-react';

interface QuestionPanelProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: string) => void;
  isRecording: boolean;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  isRecording
}) => {
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [questionNumber]);

  useEffect(() => {
    setAnswer('');
    setTimeSpent(0);
  }, [questionNumber]);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswerSubmit(answer);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 h-full flex flex-col">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-blue-400">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{formatTime(timeSpent)}</span>
          </div>
        </div>
        
        <div className="bg-slate-700 rounded-xl p-4">
          <p className="text-white text-lg leading-relaxed">
            {question}
          </p>
        </div>
      </div>

      {/* Answer Input */}
      <div className="flex-1 flex flex-col">
        <label className="text-slate-300 font-medium mb-3">
          Your Answer
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Start speaking or type your answer here..."
          className="flex-1 bg-slate-700 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isListening
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isListening ? 'animate-pulse bg-white' : 'bg-white'}`}></div>
            <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-slate-400 text-sm">
              {answer.length} characters
            </span>
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200"
            >
              <Send className="h-4 w-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};