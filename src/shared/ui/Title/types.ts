import { HTMLAttributes } from 'react';

export type TitleTag = 'h1' | 'h2' | 'h3';

export type TitleSize = 'lg' | 'md' | 'sm';

export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as: TitleTag;
  size: TitleSize;
}
