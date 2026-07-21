export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface WorkExperience {
  role: string;
  organization: string;
  period: string;
  location?: string;
  bullets: string[];
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Fluent' | 'Intermediate';
  category: 'Instructional Design' | 'Pedagogy & Training' | 'Technical Tools' | 'Professional Skills';
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Artifact {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  learningTheory: string;
  targetAudience: string;
  tags: string[];
  interactiveType: 'simulation' | 'rubric' | 'curriculum' | 'storyboard';
}
