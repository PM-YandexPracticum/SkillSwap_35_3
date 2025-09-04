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
  nextStep,
  errors,
  onBlur,
  isNextDisabled,
  setErrors
}: RegisterFormStep2Props) => {
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: avatarUrl
      }));
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatar-input')?.click();
  };

  const handleNameBlur = () => {
    onBlur('name');
  };

  const handleDropdownBlur = (fieldName: string) => {
    onBlur(fieldName);
  };

  const handleGenderChange = (v: string | string[]) => {
    if (typeof v === 'string' && (v === 'male' || v === 'female')) {
      setFormData((prev) => ({
        ...prev,
        gender: v as 'male' | 'female'
      }));
      setErrors((prev) => ({ ...prev, gender: '' }));
    }
  };

  const handleCityChange = (v: string | string[]) => {
    if (typeof v === 'string') {
      setFormData((prev) => ({ ...prev, city: v }));
      setErrors((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleSkillsChange = (v: string | string[]) => {
    if (Array.isArray(v)) {
      setFormData((prev) => ({
        ...prev,
        skills: v
      }));
      setErrors((prev) => ({ ...prev, skills: '' }));
    }
  };

  const handleSubSkillsChange = (v: string | string[]) => {
    if (typeof v === 'string') {
      setFormData((prev) => ({
        ...prev,
        subSkills: v
      }));
      setErrors((prev) => ({ ...prev, subSkills: '' }));
    }
  };

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
              <input
                id='avatar-input'
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <div
                className={styles['register__form-add-avatar-wrapper']}
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
              >
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt='Avatar'
                    className={styles['register__form-user-avatar']}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Icon
                    className={styles['register__form-user-avatar']}
                    fill='#fff'
                    name='user-circle-icon'
                  />
                )}

                <Icon
                  fill='#ABD27A'
                  name='add-avatar-icon'
                  className={styles['register__form-add-avatar']}
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
                  onBlur={handleNameBlur}
                  placeholder='Введите ваше имя'
                  error={Boolean(errors.name)}
                  message={errors.name}
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
                    error={Boolean(errors.date)}
                    message={errors.date}
                  />
                </div>
                <div className={styles['register__form-input-wrapper']}>
                  <Dropdown
                    label='Пол'
                    onBlur={() => handleDropdownBlur('gender')}
                    placeholder='Не указан'
                    options={genderOption}
                    value={formData.gender}
                    onChange={handleGenderChange}
                  />
                  {errors.gender && (
                    <div id='gender-error' className={styles.error}>
                      {errors.gender}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  label='Город'
                  placeholder='Не указан'
                  options={cityOption}
                  value={formData.city}
                  onBlur={() => handleDropdownBlur('city')}
                  onChange={handleCityChange}
                />
                {errors.city && (
                  <div id='city-error' className={styles.error}>
                    {errors.city}
                  </div>
                )}
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  multiple
                  label='Категория навыка, которому хотите научиться'
                  placeholder='Выберите категорию'
                  options={skillsOption}
                  value={formData.skills}
                  onChange={handleSkillsChange}
                  onBlur={() => handleDropdownBlur('skills')}
                />
                {errors.skills && (
                  <div id='skills-error' className={styles.error}>
                    {errors.skills}
                  </div>
                )}
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  label='Подкатегория навыка, которому хотите научиться'
                  placeholder='Выберите подкатегорию'
                  options={subSkillsOption}
                  value={formData.subSkills}
                  onChange={handleSubSkillsChange}
                  onBlur={() => handleDropdownBlur('subSkills')}
                />
                {errors.subSkills && (
                  <div id='subSkills-error' className={styles.error}>
                    {errors.subSkills}
                  </div>
                )}
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
                disabled={isNextDisabled}
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
