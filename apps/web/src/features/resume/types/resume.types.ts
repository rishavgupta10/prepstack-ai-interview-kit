export interface Resume {
  _id: string;
  fileName: string;
  fileUrl: string;

  experienceYears: number;

  skills: string[];

  projects: string[];

  createdAt: string;
  updatedAt: string;
}


export interface Personal {
  name: string;
  role: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  portfolio: string;
  portfolioUrl: string;
  summary: string;
}

export interface Education {
  id: number | string;
  school: string;
  degree: string;
  period: string;
  grade: string;
}

export interface Skill {
  id: number | string;
  label: string;
  value: string;
}

export interface Experience {
  id: number | string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Project {
  id: number | string;
  name: string;
  type: string;
  url: string;
  urlLabel: string;
  description: string;
  points: string[];
}

export interface ResumeData {
  personal: Personal;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}