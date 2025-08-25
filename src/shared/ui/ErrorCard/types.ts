// src/components/ErrorCard/types.ts

export interface ErrorCardProps {
  title?: string;
  description?: string;
  imageSrc?: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  onRetry?: () => void;
  onGoHome?: () => void;
}
