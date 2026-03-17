// 简历基本信息类型
export interface ResumeBasicInfo {
  id?: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  title: string;
  summary: string;
  avatar?: string;
}

// 工作经历类型
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  currentlyWorking: boolean;
}

// 教育经历类型
export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

// 项目经验类型
export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

// 技能类型
export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  yearsOfExperience?: number;
}

// 证书类型
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// 简历整体类型
export interface Resume {
  id: string;
  userId: string;
  title: string;
  basicInfo: ResumeBasicInfo;
  workExperiences: WorkExperience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
  certificates?: Certificate[];
  languages?: string[];
  interests?: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

// 简历解析结果类型
export interface ResumeParseResult {
  basicInfo: Partial<ResumeBasicInfo>;
  workExperiences: Partial<WorkExperience>[];
  educations: Partial<Education>[];
  projects: Partial<Project>[];
  skills: string[];
  languages: string[];
  extractedText: string;
  confidence: number;
}

// 简历诊断结果类型
export interface ResumeDiagnosis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsScore: number;
  keywords: {
    present: string[];
    missing: string[];
  };
  improvementAreas: {
    category: string;
    issues: string[];
    recommendations: string[];
  }[];
}

// 文件上传类型
export interface FileUploadResult {
  success: boolean;
  fileId?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  content?: string;
  error?: string;
}
