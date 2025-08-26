// src/components/StepCard/types.ts

export interface StepCardProps {
  title?: string;
  description?: string;
  imageSrc?: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  onClick?: () => void;
}
