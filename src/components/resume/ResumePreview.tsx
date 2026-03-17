import React from 'react';
import type { Resume } from '../../types/resume';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  return (
    <div className="border rounded-lg p-6 bg-white max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{resume.basicInfo.name}</h1>
        <h2 className="text-lg text-gray-600">{resume.basicInfo.title}</h2>
        <div className="mt-2 text-sm text-gray-500">
          {resume.basicInfo.email} | {resume.basicInfo.phone} | {resume.basicInfo.location}
        </div>
      </div>
      
      {resume.basicInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">个人简介</h3>
          <p>{resume.basicInfo.summary}</p>
        </section>
      )}
      
      {resume.workExperiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">工作经历</h3>
          {resume.workExperiences.map((exp) => (
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
      
      {resume.educations.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">教育经历</h3>
          {resume.educations.map((edu) => (
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
      
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">技能</h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
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
      
      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">项目经历</h3>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-medium">{proj.name}</span>
                <span className="text-sm text-gray-500">
                  {proj.startDate} - {proj.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700">{proj.role}</div>
              <p className="text-sm mt-1">{proj.description}</p>
              {proj.technologies.length > 0 && (
                <div className="text-xs mt-1">
                  技术栈：{proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
