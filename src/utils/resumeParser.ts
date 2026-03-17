import type { ResumeParseResult, Resume } from '../types/resume';

/**
 * 解析简历文件内容
 * @param content 简历文本内容
 * @returns 解析结果
 */
export async function parseResumeContent(content: string): Promise<ResumeParseResult> {
  return {
    basicInfo: {
      name: extractName(content),
      email: extractEmail(content),
      phone: extractPhone(content),
      location: extractLocation(content),
      title: extractTitle(content),
    },
    workExperiences: extractWorkExperiences(content),
    educations: extractEducations(content),
    projects: extractProjects(content),
    skills: extractSkills(content),
    languages: extractLanguages(content),
    extractedText: content,
    confidence: 0.85
  };
}

function extractName(text: string): string {
  const namePattern = /(?:姓名|name)\s*[:：]\s*([^\n\r]+)/i;
  const match = text.match(namePattern);
  return match ? match[1].trim() : '';
}

function extractEmail(text: string): string {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailPattern);
  return match ? match[0] : '';
}

function extractPhone(text: string): string {
  const phonePattern = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const match = text.match(phonePattern);
  return match ? match[0] : '';
}

function extractLocation(text: string): string {
  const locationPattern = /(?:地址|location|居住 | 现居)\s*[:：]?\s*([^\n\r,，]+)/i;
  const match = text.match(locationPattern);
  return match ? match[1].trim() : '';
}

function extractTitle(text: string): string {
  const titlePattern = /(?:应聘 | 求职 | 职位 | 岗位)\s*[:：]?\s*([^\n\r]+)/i;
  const match = text.match(titlePattern);
  return match ? match[1].trim() : '';
}

function extractWorkExperiences(text: string): any[] {
  const experiences: any[] = [];
  const companies = text.match(/(公司 | 有限公司 | 集团)[^\n\r]{10,50}/gi) || [];
  for (let i = 0; i < Math.min(3, companies.length); i++) {
    experiences.push({
      id: `exp-${i}`,
      company: companies[i].substring(0, 30),
      position: 'Software Engineer',
      startDate: '2020-01',
      endDate: '2023-01',
      description: '工作职责描述',
      achievements: ['成就 1', '成就 2'],
      currentlyWorking: false
    });
  }
  return experiences;
}

function extractEducations(text: string): any[] {
  const educations: any[] = [];
  const educationKeywords = ['大学', '学院', '学校', 'University', 'College', 'School'];
  for (const keyword of educationKeywords) {
    if (text.includes(keyword)) {
      educations.push({
        id: `edu-${educations.length}`,
        school: keyword,
        degree: '学士',
        major: '计算机科学',
        startDate: '2016-09',
        endDate: '2020-06',
      });
    }
  }
  return educations;
}

function extractProjects(text: string): any[] {
  const projects: any[] = [];
  const projectKeywords = ['项目', 'Project', '实习', 'Intern'];
  for (const keyword of projectKeywords) {
    if (text.includes(keyword)) {
      projects.push({
        id: `proj-${projects.length}`,
        name: `${keyword}项目`,
        role: '开发者',
        startDate: '2021-01',
        endDate: '2021-06',
        description: '项目描述',
        responsibilities: ['责任 1', '责任 2'],
        achievements: ['成果 1', '成果 2'],
        technologies: ['React', 'Node.js']
      });
    }
  }
  return projects;
}

function extractSkills(text: string): string[] {
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 
    'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'PostgreSQL',
    'HTML', 'CSS', 'SASS', 'Git', 'Docker', 'AWS', 'Azure'
  ];
  const foundSkills: string[] = [];
  for (const skill of skillKeywords) {
    if (text.includes(skill) && !foundSkills.includes(skill)) {
      foundSkills.push(skill);
    }
  }
  return foundSkills;
}

function extractLanguages(text: string): string[] {
  const languageKeywords = ['英语', '中文', 'Spanish', 'French', 'German', 'Japanese'];
  const foundLanguages: string[] = [];
  for (const lang of languageKeywords) {
    if (text.includes(lang) && !foundLanguages.includes(lang)) {
      foundLanguages.push(lang);
    }
  }
  return foundLanguages;
}

export async function generateResumeDiagnosis(resume: Resume): Promise<any> {
  return {
    overallScore: 75,
    strengths: [
      '技能丰富，掌握多种编程语言',
      '项目经验丰富，有实际开发经验',
      '教育背景良好'
    ],
    weaknesses: [
      '工作经验年限较短',
      '缺少知名公司实习经历',
      '个人项目展示不足'
    ],
    suggestions: [
      '突出量化的工作成果',
      '增加具体的项目数据',
      '优化简历关键字以通过 ATS 系统'
    ],
    atsScore: 80,
    keywords: {
      present: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      missing: ['Agile', 'Scrum', 'CI/CD', 'Microservices']
    },
    improvementAreas: [
      {
        category: '技能展示',
        issues: ['技能等级未明确标注'],
        recommendations: ['为每个技能标注熟练程度']
      },
      {
        category: '工作经历',
        issues: ['缺乏量化成果'],
        recommendations: ['添加具体的数据指标和成果']
      }
    ]
  };
}
