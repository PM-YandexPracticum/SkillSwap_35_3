import { Button, Input, Title } from '@/shared/ui';
import { StepCard } from '@/shared/ui/StepCard';
import { steps } from '@/shared/lib/constants/steps';
import styles from './RegisterForm.module.css';
import { RegisterFormStep1Props } from './type';

const RegisterFormStep1 = ({
  handleChange,
  formData,
  nextStep,
  errors,
  onEmailBlur,
  isNextDisabled
}: RegisterFormStep1Props) => {
  return (
    <div className={styles['register__form-step-1']}>
      <Title as='h2' size='lg' className={styles['regiter__form-steps']}>
        Шаг 1 из 3
      </Title>
      <div className={styles['register__form-lines']}>
        <span
          className={`${styles['register__form-line']} ${styles['line-active']}`}
        ></span>
        <span className={styles['register__form-line']}></span>
        <span className={styles['register__form-line']}></span>
      </div>
      <div className={styles['register__form-content']}>
        <div className={styles['register__form-wrapper']}>
          <div className={styles['register__form-buttons-list']}>
            <Button
              type='secondary'
              size='large'
              fullWidth
              iconName='google-icon'
              className={styles['register__form-social-button']}
            >
              Продолжить с Google
            </Button>
            <Button
              type='secondary'
              size='large'
              fullWidth
              iconName='apple-icon'
              className={styles['register__form-social-button']}
            >
              Продолжить с Apple
            </Button>
          </div>
          <div className={styles['register__form-wrapper-lines']}>
            <span className={styles['line']}></span>
            <p className={styles['register__form-line-text']}>или</p>
            <span className={styles['line']}></span>
          </div>
          <form
            className={styles['register__form-inputs-list']}
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles['register__form-inputs-wrapper']}>
              <div className={styles['register__form-input-wrapper']}>
                <label
                  htmlFor='email'
                  className={styles['register__form-label']}
                >
                  Email
                </label>
                <Input
                  required
                  onChange={handleChange}
                  value={formData.email}
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Введите email'
                  onBlur={onEmailBlur}
                />
                {errors.email && (
                  <span id='email-error' className={styles.error}>
                    {errors.email}
                  </span>
                )}
                {errors.server && (
                  <span id='email-server-error' className={styles.error}>
                    {errors.server}
                  </span>
                )}
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <label
                  htmlFor='password'
                  className={styles['register__form-label']}
                >
                  Пароль
                </label>
                <Input
                  required
                  onChange={handleChange}
                  value={formData.password}
                  type='password'
                  name='password'
                  id='password'
                  iconPosition='right'
                  placeholder='Придумайте надёжный пароль'
                />
                {errors.password && (
                  <span id='password-error' className={styles.error}>
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={nextStep}
              htmlType='button'
              disabled={isNextDisabled}
            >
              Далее
            </Button>
          </form>
        </div>
        <div className={styles['register__form-step-card-wrapper']}>
          <StepCard
            title={steps.registration1.title}
            description={steps.registration1.description}
            imageSrc={steps.registration1.imageSrc}
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterFormStep1;
