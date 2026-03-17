import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeAnalysis from './pages/ResumeAnalysis';
import ResumeOptimize from './pages/ResumeOptimize';
import MockInterview from './pages/MockInterview';
import ResumeLibrary from './pages/ResumeLibrary';

type Page = 'home' | 'resume-analysis' | 'resume-optimize' | 'mock-interview' | 'question-bank' | 'offer-compare'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/resume-optimize" element={<ResumeOptimize />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/resume-library" element={<ResumeLibrary />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
