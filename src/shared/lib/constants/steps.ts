import {
  LightBulbImage,
  SchoolBoardImage,
  UserInfoImage
} from '@/shared/assets/images/steps';

type StepImage = React.FC<React.SVGProps<SVGSVGElement>>;

type StepData = {
  title: string;
  description: string;
  image: StepImage;
};

export const steps: Record<string, StepData> = {
  welcomeBack: {
    title: 'С возвращением в SkillSwap!',
    description: 'Обменивайтесь знаниями и навыками с другими людьми',
    image: LightBulbImage
  },
  registration1: {
    title: 'Добро пожаловать в SkillSwap!',
    description:
      'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
    image: LightBulbImage
  },
  registration2: {
    title: 'Расскажите немного о себе',
    description:
      'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
    image: SchoolBoardImage
  },
  registration3: {
    title: 'Укажите, чем вы готовы поделиться',
    description:
      'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
    image: UserInfoImage
  }
};



/*
registration2
registration3



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
  500: {
    title: 'На сервере произошла ошибка',
    description: 'Попробуйте позже или вернитесь на главную страницу',
    image: Error500Image
  }
};
*/
