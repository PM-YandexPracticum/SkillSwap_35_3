import { HTMLAttributes } from 'react';

export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4';

export type TitleSize = 'xl' | 'lg' | 'md' | 'sm';

export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as: TitleTag;
  size: TitleSize;
}
