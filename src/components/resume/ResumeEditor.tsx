import React, { useState } from 'react';
import type { Resume } from '../../types/resume';

interface ResumeEditorProps {
  resume: Resume;
  onSave: (updatedResume: Resume) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resume, onSave }) => {
  const [editedResume, setEditedResume] = useState<Resume>(resume);

  const handleBasicInfoChange = (field: string, value: string) => {
    setEditedResume(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value }
    }));
  };

  const addWorkExperience = () => {
    const newExp = {
      id: `work-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [''],
      currentlyWorking: false
    };
    setEditedResume(prev => ({
      ...prev,
      workExperiences: [...prev.workExperiences, newExp]
    }));
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updatedExperiences = [...editedResume.workExperiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setEditedResume(prev => ({ ...prev, workExperiences: updatedExperiences }));
  };

  const addSkill = () => {
    const newSkill = { id: `skill-${Date.now()}`, name: '', level: 'intermediate' as const, category: 'Technical' };
    setEditedResume(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = [...editedResume.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setEditedResume(prev => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">基本信息</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">姓名</label>
              <input
                type="text"
                value={editedResume.basicInfo.name}
                onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">职位</label>
              <input
                type="text"
                value={editedResume.basicInfo.title}
                onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">邮箱</label>
              <input
                type="email"
                value={editedResume.basicInfo.email}
                onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">电话</label>
              <input
                type="tel"
                value={editedResume.basicInfo.phone}
                onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">个人简介</h3>
          <textarea
            value={editedResume.basicInfo.summary}
            onChange={(e) => handleBasicInfoChange('summary', e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            placeholder="简要介绍自己，突出核心竞争力..."
          />
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">技能</h3>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800" onClick={addSkill}>
                + 添加技能
              </button>
            </div>
            <div className="space-y-2">
              {editedResume.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-1"
                    placeholder="技能名称"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-1"
                  >
                    <option value="beginner">初级</option>
                    <option value="intermediate">中级</option>
                    <option value="advanced">高级</option>
                    <option value="expert">专家</option>
                  </select>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      const updatedSkills = [...editedResume.skills];
                      updatedSkills.splice(index, 1);
                      setEditedResume(prev => ({ ...prev, skills: updatedSkills }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">工作经历</h3>
          <button type="button" className="text-sm text-blue-600 hover:text-blue-800" onClick={addWorkExperience}>
            + 添加工作经历
          </button>
        </div>
        {editedResume.workExperiences.map((exp, index) => (
          <div key={exp.id} className="mb-4 p-4 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">公司名称</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">职位</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">开始日期</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">结束日期</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">工作描述</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => onSave(editedResume)}
        >
          保存更改
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;
