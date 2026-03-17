import React, { useState, useEffect } from 'react';
import type { Resume } from '../types/resume';
import { getStoredResumes, deleteResume } from '../utils/resumeStorage';

const ResumeLibrary: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = () => {
    const storedResumes = getStoredResumes();
    setResumes(storedResumes);
  };

  const handleDeleteResume = (id: string) => {
    deleteResume(id);
    loadResumes();
    if (selectedResume && selectedResume.id === id) {
      setSelectedResume(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">简历库</h1>
          <p className="text-gray-600">管理您的多版本简历</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">我的简历 ({resumes.length})</h2>
              </div>
              
              {resumes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">暂无简历，请先上传简历</p>
              ) : (
                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <div 
                      key={resume.id} 
                      className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 ${
                        selectedResume?.id === resume.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedResume(resume)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{resume.title}</h3>
                          <p className="text-sm text-gray-500">{resume.basicInfo.name}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteResume(resume.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          删除
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        更新于 {new Date(resume.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {selectedResume ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">{selectedResume.title}</h2>
                  </div>
                  
                  <div className="border rounded-lg p-6 bg-gray-50 max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold">{selectedResume.basicInfo.name}</h1>
                      <h2 className="text-lg text-gray-600">{selectedResume.basicInfo.title}</h2>
                      <div className="mt-2 text-sm text-gray-500">
                        {selectedResume.basicInfo.email} | {selectedResume.basicInfo.phone} | {selectedResume.basicInfo.location}
                      </div>
                    </div>
                    
                    {selectedResume.basicInfo.summary && (
                      <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">个人简介</h3>
                        <p>{selectedResume.basicInfo.summary}</p>
                      </section>
                    )}
                    
                    {selectedResume.workExperiences.length > 0 && (
                      <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">工作经历</h3>
                        {selectedResume.workExperiences.map((exp) => (
                          <div key={exp.id} className="mb-3">
                            <div className="flex justify-between">
                              <span className="font-medium">{exp.position}</span>
                              <span className="text-sm text-gray-500">
                                {exp.startDate} - {exp.currentlyWorking ? '至今' : exp.endDate}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700">{exp.company}</div>
                            <p className="text-sm mt-1">{exp.description}</p>
                            {exp.achievements.length > 0 && (
                              <ul className="list-disc list-inside text-sm mt-1">
                                {exp.achievements.map((achievement, idx) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </section>
                    )}
                    
                    {selectedResume.educations.length > 0 && (
                      <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">教育经历</h3>
                        {selectedResume.educations.map((edu) => (
                          <div key={edu.id} className="mb-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{edu.school}</span>
                              <span className="text-sm text-gray-500">
                                {edu.startDate} - {edu.endDate}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700">{edu.degree} - {edu.major}</div>
                          </div>
                        ))}
                      </section>
                    )}
                    
                    {selectedResume.skills.length > 0 && (
                      <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">技能</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedResume.skills.map((skill) => (
                            <span 
                              key={skill.id} 
                              className="px-2 py-1 bg-gray-200 rounded text-sm"
                            >
                              {skill.name} ({skill.level})
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">请选择一份简历进行查看</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeLibrary;
