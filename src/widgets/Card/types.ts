type Skill = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
};

type User = {
  id: number;
  name: string;
  avatar: string;
  city: string;
  birthDate: string;
  teachingSkillId: number;
  learningSkillIds: number[];
};

export type CardProps = {
  user: User;
  skills: Skill[];
  onDetails: (id: number) => void;
};
