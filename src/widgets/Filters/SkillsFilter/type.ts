export interface SkillCategory {
  value: string;
  name: string;
  subcategories?: SkillCategory[];
}

export interface SkillsFilterProps {
  onChange: (skillsList: string[]) => void;
  value: string[];
  skills: SkillCategory[];
}
