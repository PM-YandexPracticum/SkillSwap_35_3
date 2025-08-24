// src/components/ErrorCard/types.ts

export interface ErrorCardProps {
  title?: string;
  message?: string;
  imageSrc?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}
