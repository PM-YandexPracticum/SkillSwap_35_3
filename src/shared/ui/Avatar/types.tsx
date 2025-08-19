export interface AvatarProps {
  src: string; // ссылка на изображение
  alt: string; // альтернативный текст
  className?: string;
  onClick?: () => void;
}
