import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { InterviewSetup } from './pages/InterviewSetup';
import { InterviewRoom } from './pages/InterviewRoom';
import { FeedbackPage } from './pages/FeedbackPage';
import { InterviewProvider } from './context/InterviewContext';

function App() {
  return (
    <InterviewProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup" element={<InterviewSetup />} />
            <Route path="/interview" element={<InterviewRoom />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </Router>
    </InterviewProvider>
  );
}

export default App;