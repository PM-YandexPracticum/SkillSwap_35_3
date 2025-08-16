export interface ISkill {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  images: string[];
}

export interface IUser {
  id: number;
  name: string;
  gender: 'male' | 'female';
  email: string;
  avatar: string;
  city: string;
  birthDate: string;
  teachingSkillId: number;
  learningSkillIds: number[];
}

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface IRequest {
  id: number;
  skillId: number;
  fromUserId: number;
  toUserId: number;
  status: RequestStatus;
}

export interface IMockData {
  skills: ISkill[];
  users: IUser[];
}
