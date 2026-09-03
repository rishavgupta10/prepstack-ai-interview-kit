export interface IPersonal {
  name: string;
  role: string;
  phone: string;
  email: string;
  location: string;
  linkedin?: string;
  linkedinUrl?: string;
  github?: string;
  githubUrl?: string;
  portfolio?: string;
  portfolioUrl?: string;
  summary: string;
}

export interface IEducation {
  _id?: string; // Automatically added by Mongoose unless disabled
  school: string;
  degree: string;
  period: string;
  grade?: string;
}

export interface ISkill {
  _id?: string; // Automatically added by Mongoose unless disabled
  label: string;
  value: string;
}

export interface IExperience {
  _id?: string; // Automatically added by Mongoose unless disabled
  role: string;
  company: string;
  period: string;
  points?: string[];
}

export interface IProject {
  _id?: string; // Automatically added by Mongoose unless disabled
  name: string;
  type: string;
  url?: string;
  urlLabel?: string;
  description: string;
  points?: string[];
}

// The core structure expected when creating a new record
export interface ICreateResumeMetaDataInput {
  userId?: string;
  personal: IPersonal;
  education?: IEducation[];
  skills?: ISkill[];
  experience?: IExperience[];
  projects?: IProject[];
}
