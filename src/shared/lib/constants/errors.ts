import { Error404Image, Error500Image } from '@/shared/assets/images/errors';

type ErrorImage = React.FC<React.SVGProps<SVGSVGElement>>;

type ErrorData = {
  title: string;
  description: string;
  image: ErrorImage;
};

export const errors: Record<number, ErrorData> = {
  404: {
    title: 'Страница не найдена',
    description:
      'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
    image: Error404Image
  },
  405: {
    title: 'На сервере произошла ошибка',
    description: 'Попробуйте позже или вернитесь на главную страницу',
    image: Error500Image
  }
};
