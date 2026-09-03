export interface Resume {
  id: string;

  userId: string;

  originalFileName: string;

  skills: string[];

  projects: string[];

  yearsOfExperience: number;

  uploadedAt: Date;
}