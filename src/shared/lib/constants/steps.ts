import {
  LightBulbImage,
  SchoolBoardImage,
  UserInfoImage
} from '@/shared/assets/images/steps';

type StepImage = React.FC<React.SVGProps<SVGSVGElement>>;

type StepData = {
  title: string;
  description: string;
  imageSrc: StepImage;
};

export const steps: Record<string, StepData> = {
  welcomeBack: {
    title: 'С возвращением в SkillSwap!',
    description: 'Обменивайтесь знаниями и навыками с другими людьми',
    imageSrc: LightBulbImage
  },
  registration1: {
    title: 'Добро пожаловать в SkillSwap!',
    description:
      'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
    imageSrc: LightBulbImage
  },
  registration2: {
    title: 'Расскажите немного о себе',
    description:
      'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
    imageSrc: SchoolBoardImage
  },
  registration3: {
    title: 'Укажите, чем вы готовы поделиться',
    description:
      'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
    imageSrc: UserInfoImage
  }
};
