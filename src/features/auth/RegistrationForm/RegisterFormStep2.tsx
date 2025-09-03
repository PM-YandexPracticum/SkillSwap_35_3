import { steps } from '@/shared/lib/constants/steps';
import { Title, Icon, Input, Dropdown, Button } from '@/shared/ui';
import { StepCard } from '@/shared/ui/StepCard';
import styles from './RegisterForm.module.css';
import { RegisterFormStep2Props } from './type';

const RegisterFormStep2 = ({
  handleChange,
  formData,
  setFormData,
  genderOption,
  cityOption,
  skillsOption,
  subSkillsOption,
  prevStep,
  nextStep
}: RegisterFormStep2Props) => {
  return (
    <div className={styles['register__form-step-1']}>
      <Title as='h2' size='lg' className={styles['regiter__form-steps']}>
        Шаг 2 из 3
      </Title>
      <div className={styles['register__form-lines']}>
        <span
          className={`${styles['register__form-line']} ${styles['line-active']}`}
        ></span>
        <span
          className={`${styles['register__form-line']} ${styles['line-active']}`}
        ></span>
        <span className={styles['register__form-line']}></span>
      </div>
      <div className={styles['register__form-content']}>
        <div className={styles['register__form-wrapper']}>
          <form
            className={styles['register__form']}
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles['register__form-inputs-wrapper']}>
              <div className={styles['register__form-add-avatar-wrapper']}>
                <Icon
                  className={styles['register__form-user-avatar']}
                  fill='#fff'
                  name='user-circle-icon'
                ></Icon>
                <Icon
                  fill='#ABD27A'
                  name='add-avatar-icon'
                  className={styles['reqister__form-add-avatar']}
                />
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <label
                  htmlFor='name'
                  className={styles['register__form-label']}
                >
                  Имя
                </label>
                <Input
                  required
                  onChange={handleChange}
                  value={formData.name}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Введите ваше имя'
                />
              </div>
              <div className={styles['register__form-inputs-wrapper-step-2']}>
                <div className={styles['register__form-input-wrapper']}>
                  <label
                    htmlFor='date'
                    className={styles['register__form-label']}
                  >
                    Дата рождения
                  </label>
                  <Input
                    required
                    onChange={handleChange}
                    value={formData.date}
                    type='date'
                    name='date'
                    id='date'
                    icon={<Icon name='calendar-icon'></Icon>}
                    iconPosition='right'
                    placeholder='дд.мм.гггг'
                  />
                </div>
                <div className={styles['register__form-input-wrapper']}>
                  <Dropdown
                    label='Пол'
                    placeholder='Не указан'
                    options={genderOption}
                    value={formData.gender}
                    onChange={(v) => {
                      if (typeof v === 'string') {
                        setFormData((prev) => ({ ...prev, gender: v }));
                      }
                    }}
                  />
                </div>
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  label='Город'
                  placeholder='Не указан'
                  options={cityOption}
                  value={formData.city}
                  onChange={(v) => {
                    if (typeof v === 'string') {
                      setFormData((prev) => ({ ...prev, city: v }));
                    }
                  }}
                />
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  multiple
                  label='Категория навыка, которому хотите научиться'
                  placeholder='Выберите категорию'
                  options={skillsOption}
                  value={formData.skills}
                  onChange={(v) => {
                    if (Array.isArray(v)) {
                      setFormData((prev) => ({
                        ...prev,
                        skills: v
                      }));
                    }
                  }}
                />
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  multiple
                  label='Подкатегория навыка, которому хотите научиться'
                  placeholder='Выберите подкатегорию'
                  options={subSkillsOption}
                  value={formData.subSkills}
                  onChange={(v) => {
                    if (Array.isArray(v)) {
                      setFormData((prev) => ({
                        ...prev,
                        subSkills: v
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div className={styles['register__form-buttons-list-step-2']}>
              <Button
                className={styles['register__form-button']}
                type='secondary'
                size='medium'
                onClick={prevStep}
                htmlType='button'
              >
                Назад
              </Button>
              <Button
                className={styles['register__form-button']}
                size='medium'
                onClick={nextStep}
                htmlType='button'
              >
                Продолжить
              </Button>
            </div>
          </form>
        </div>
        <div className={styles['register__form-step-card-wrapper']}>
          <StepCard
            title={steps.registration2.title}
            description={steps.registration2.description}
            imageSrc={steps.registration2.imageSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterFormStep2;
