export interface Administrator {
  ID: number;
  Full_Name?: string;
  Email?: string;
  IsDeleted?: boolean;
  User_ID?: number;
  user?: User;
}

export interface Candidate {
  ID: number;
  Full_Name?: string;
  Email?: string;
  DateOfBirth?: Date;
  City_ID?: number;
  Avatar?: string;
  Description?: string;
  Phone?: string;
  Degree?: string;
  Major?: string;
  Sex?: string;
  User_ID?: number;
  IsDeleted?: boolean;
  user?: User;
  city?: City;
  candidate_company?: CandidateCompany[];
  candidate_job?: CandidateJob[];
  comment?: Comment[];
  curriculum_vitae?: CurriculumVitae[];
}

export interface CandidateCompany {
  ID: number;
  Candidate_ID?: number;
  Company_ID?: number;
  candidate?: Candidate;
  company?: Company;
}

export interface CandidateJob {
  ID: number;
  Candidate_ID?: number;
  Job_ID?: number;
  CV_ID?: number;
  AppliedDate?: Date;
  IsLiked?: boolean;
  IsApplied?: boolean;
  candidate?: Candidate;
  job?: Job;
  curriculum_vitae?: CurriculumVitae;
}

export interface City {
  ID: number;
  CityName?: string;
  candidate?: Candidate[];
  company?: Company[];
  job?: Job[];
}

export interface Comment {
  ID: number;
  Candidate_ID?: number;
  Company_ID?: number;
  Rating?: number;
  Assessment?: string;
  CreatedDate?: Date;
  candidate?: Candidate;
  company?: Company;
}

export interface Company {
  ID: number;
  Name: string;
  Address: string;
  City_ID?: number;
  Avatar: string;
  Description?: string;
  Email: string;
  Ischecked: boolean;
  IsDeleted: boolean;
  User_ID: number;
  candidate_company?: CandidateCompany[];
  comment?: Comment[];
  user?: User;
  city?: City;
  job?: Job[];
}

export interface CurriculumVitae {
  ID: number;
  CareerGoals?: string;
  DegreeDetail?: string;
  ExperienceDetail?: string;
  Skill?: string;
  ForeignLanguage?: string;
  Candidate_ID?: number;
  CV_Link?: string;
  Is_Deleted?: boolean;
  candidate_job?: CandidateJob[];
  candidate?: Candidate;
}

export interface Job {
  ID: number;
  Company_ID?: number;
  Name?: string;
  Description?: string;
  SalaryFrom?: number;
  SalaryTo?: number;
  AgeFrom?: number;
  AgeTo?: number;
  EndDate?: Date;
  CreateDate?: Date;
  Quantity?: number;
  IsChecked?: boolean;
  DegreeRequired: string;
  IsDeleted?: boolean;
  SexRequired?: string;
  ProbationaryPriod?: number;
  Benefit?: string;
  Position?: string;
  Type?: string;
  City_ID?: number;
  Address?: string;
  ExperienceRequired?: number;
  JobRequired?: string;
  candidate_job?: CandidateJob[];
  company?: Company;
  city?: City;
  job_major?: JobMajor[];
}

export interface JobMajor {
  ID: number;
  Job_ID?: number;
  Major_ID?: number;
  Point?: number;
  job?: Job;
  major?: Major;
}

export interface Major {
  ID: number;
  Name?: string;
  job_major?: JobMajor[];
}

export interface Role {
  ID: number;
  Name: string;
  user?: User;
}
export interface User{
  ID: number;
  Username: string;
  Password: string;
  RegisterDate?: Date;
  UserRole_ID?: number;
  // IsDeleted: boolean;
  refresh_token?: string;
  administrator?: Administrator[];
  candidate?: Candidate[];
  company?: Company[];
  role?: Role;
}


