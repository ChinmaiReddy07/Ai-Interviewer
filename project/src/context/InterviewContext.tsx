import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InterviewConfig {
  jobTitle: string;
  company: string;
  experienceLevel: string;
  interviewType: string;
  duration: number;
  difficulty: string;
}

interface InterviewResults {
  answers: string[];
  questions: string[];
  totalTime: number;
  completionRate: number;
}

interface InterviewContextType {
  interviewConfig: InterviewConfig | null;
  setInterviewConfig: (config: InterviewConfig) => void;
  interviewResults: InterviewResults | null;
  setInterviewResults: (results: InterviewResults) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [interviewResults, setInterviewResults] = useState<InterviewResults | null>(null);

  return (
    <InterviewContext.Provider
      value={{
        interviewConfig,
        setInterviewConfig,
        interviewResults,
        setInterviewResults,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};