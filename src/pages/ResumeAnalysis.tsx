import React, { useState } from 'react';
import FileUpload from '../components/resume/FileUpload';
import ResumePreview from '../components/resume/ResumePreview';
import ResumeEditor from '../components/resume/ResumeEditor';
import type { Resume } from '../types/resume';
import { parseResumeContent, generateResumeDiagnosis } from '../utils/resumeParser';
import { saveResume } from '../utils/resumeStorage';

const ResumeAnalysis: React.FC = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'preview' | 'edit' | 'analysis'>('upload');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const textContent = await readFileAsText(file);
      const parseResult = await parseResumeContent(textContent);
      
      const newResume: Resume = {
        id: `resume-${Date.now()}`,
        userId: 'current-user-id',
        title: `${parseResult.basicInfo.name || 'My'} Resume`,
        basicInfo: {
          name: parseResult.basicInfo.name || '',
          phone: parseResult.basicInfo.phone || '',
          email: parseResult.basicInfo.email || '',
          location: parseResult.basicInfo.location || '',
          title: parseResult.basicInfo.title || '',
          summary: parseResult.basicInfo.summary || ''
        },
        workExperiences: parseResult.workExperiences.map((exp, index) => ({
          id: exp.id || `work-${index}`,
          company: exp.company || 'Company Name',
          position: exp.position || 'Position Title',
          startDate: exp.startDate || '2020-01',
          endDate: exp.endDate || '2023-01',
          description: exp.description || 'Description here',
          achievements: exp.achievements || [],
          currentlyWorking: exp.currentlyWorking || false
        })),
        educations: parseResult.educations.map((edu, index) => ({
          id: edu.id || `edu-${index}`,
          school: edu.school || 'School Name',
          degree: edu.degree || 'Degree',
          major: edu.major || 'Major',
          startDate: edu.startDate || '2016-09',
          endDate: edu.endDate || '2020-06',
          gpa: edu.gpa,
          description: edu.description
        })),
        projects: parseResult.projects.map((proj, index) => ({
          id: proj.id || `proj-${index}`,
          name: proj.name || 'Project Name',
          role: proj.role || 'Role',
          startDate: proj.startDate || '2021-01',
          endDate: proj.endDate || '2021-06',
          description: proj.description || 'Description',
          responsibilities: proj.responsibilities || [],
          achievements: proj.achievements || [],
          technologies: proj.technologies || []
        })),
        skills: parseResult.skills.map((skill, index) => ({
          id: `skill-${index}`,
          name: skill,
          level: 'intermediate',
          category: 'Technical'
        })),
        languages: parseResult.languages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      };
      
      setResume(newResume);
      const diag = await generateResumeDiagnosis(newResume);
      setDiagnosis(diag);
      saveResume(newResume);
      setActiveTab('preview');
    } catch (error) {
      console.error('Error processing resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const handleSaveResume = (updatedResume: Resume) => {
    setResume(updatedResume);
    saveResume(updatedResume);
    alert('简历已保存！');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 简历分析助手</h1>
          <p className="text-gray-600">上传简历，获得专业分析与优化建议</p>
        </div>

        {!resume ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">上传简历文件</h2>
              <FileUpload onFileUpload={handleFileUpload} />
              <div className="mt-6 text-sm text-gray-600">
                <h3 className="font-medium mb-2">支持的文件格式：</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>PDF 文档 (.pdf)</li>
                  <li>Word 文档 (.doc, .docx)</li>
                  <li>纯文本文件 (.txt)</li>
                  <li>图片格式 (.jpg, .jpeg, .png)</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'upload'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('upload')}
              >
                重新上传
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                简历预览
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'edit'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('edit')}
              >
                简历编辑
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'analysis'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('analysis')}
              >
                简历分析
              </button>
            </div>

            <div className="bg-white rounded-lg shadow">
              {activeTab === 'upload' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">重新上传简历</h2>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">简历预览</h2>
                  </div>
                  <ResumePreview resume={resume} />
                </div>
              )}

              {activeTab === 'edit' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">简历编辑</h2>
                  </div>
                  <ResumeEditor resume={resume} onSave={handleSaveResume} />
                </div>
              )}

              {activeTab === 'analysis' && diagnosis && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">简历分析报告</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-blue-600">{diagnosis.overallScore}%</div>
                        <div className="text-sm text-gray-600 mt-1">综合评分</div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-green-600">{diagnosis.atsScore}%</div>
                        <div className="text-sm text-gray-600 mt-1">ATS 匹配度</div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-purple-600">{resume.skills.length}</div>
                        <div className="text-sm text-gray-600 mt-1">技能数量</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-green-600">优势</h3>
                        <ul className="space-y-2">
                          {diagnosis.strengths.map((strength: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-red-600">待改进</h3>
                        <ul className="space-y-2">
                          {diagnosis.weaknesses.map((weakness: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">优化建议</h3>
                      <ul className="space-y-2">
                        {diagnosis.suggestions.map((suggestion: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">关键词分析</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">已包含的关键词</h4>
                          <div className="flex flex-wrap gap-2">
                            {diagnosis.keywords.present.map((kw: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-yellow-600 mb-2">缺失的重要关键词</h4>
                          <div className="flex flex-wrap gap-2">
                            {diagnosis.keywords.missing.map((kw: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
