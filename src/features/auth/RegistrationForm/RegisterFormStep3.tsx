import { Button, Dropdown, Input, ModalUI, Title } from '@/shared/ui';
import { steps } from '@/shared/lib/constants/steps';
import styles from './RegisterForm.module.css';
import { RegisterFormStep3Props } from './type';
import { StepCard } from '@/shared/ui/StepCard';
import { DragAndDrop } from '@/shared/ui/DragAndDrop';
import { AsideGallery } from '@/shared/ui/Modal/ModalAsideGallery';
import { useState } from 'react';
import { registerUserThunk } from '../thunks';
import { useAppDispatch } from '@/app/store';
import { fetchUsers } from 'src/entities/User/thunks/usersThunks';

const RegisterFormStep3 = ({
  handleChange,
  formData,
  setFormData,
  skillsOption,
  subSkillsOption,
  prevStep,
  abilityLabel,
  subAbilityLabel,
  handleCloseModalFull,
  errors,
  isNextDisabled,
  onBlur,
  setErrors
}: RegisterFormStep3Props) => {
  const dispatch = useAppDispatch();
  const [modalIsOpenSkills, setModalIsOpenSkills] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSkillsModalOpen = () => {
    setModalIsOpenSkills(true);
  };

  const handleSkillsModalClose = () => {
    setModalIsOpenSkills(false);
  };

  const handleDropdownBlur = (fieldName: string) => {
    onBlur(fieldName);
  };

  const handleSuccessModalOpen = () => {
    setModalIsOpenSuccess(true);
  };

  const handleSuccessModalClose = () => {
    setModalIsOpenSuccess(false);
  };

  const handleBlurAbilityTitle = () => {
    onBlur('abilityTitle');
  };

  const handleBlurDescription = () => {
    onBlur('description');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        registerUserThunk({
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          about: formData.description,
          password: formData.password,
          city: formData.city,
          birthDate: formData.date,
          avatar: formData.avatar,
          teachingSkillId: parseInt(formData.abilityOption) || 1,
          learningSkillIds:
            formData.skills.length > 0
              ? formData.skills.map((skill) => parseInt(skill))
              : []
        })
      ).unwrap();
      dispatch(fetchUsers());
      handleSuccessModalOpen();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAbilityOptionChange = (v: string | string[]) => {
    if (typeof v === 'string') {
      setFormData((prev) => ({ ...prev, abilityOption: v }));
      setErrors((prev) => ({ ...prev, abilityOption: '' }));
    }
  };

  const handleSubAbilityOptionChange = (v: string | string[]) => {
    if (typeof v === 'string') {
      setFormData((prev) => ({ ...prev, subAbilityOption: v }));
      setErrors((prev) => ({ ...prev, subAbilityOption: '' }));
    }
  };

  return (
    <div className={styles['register__form-step-1']}>
      <Title as='h2' size='lg' className={styles['regiter__form-steps']}>
        Шаг 3 из 3
      </Title>
      <div className={styles['register__form-lines']}>
        <span
          className={`${styles['register__form-line']} ${styles['line-active']}`}
        ></span>
        <span
          className={`${styles['register__form-line']} ${styles['line-active']}`}
        ></span>
        <span
          className={`${styles['register__form-line']} ${styles['line-active']}`}
        ></span>
      </div>
      <div className={styles['register__form-content']}>
        <div className={styles['register__form-wrapper']}>
          <form
            className={styles['register__form']}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles['register__form-inputs-wrapper']}>
              <div className={styles['register__form-input-wrapper']}>
                <label
                  htmlFor='abilityTitle'
                  className={styles['register__form-label']}
                >
                  Название навыка
                </label>
                <Input
                  onChange={handleChange}
                  value={formData.abilityTitle}
                  type='text'
                  name='abilityTitle'
                  id='abilityTitle'
                  onBlur={handleBlurAbilityTitle}
                  placeholder='Введите название вашего навыка'
                  required
                  error={Boolean(errors.abilityTitle)}
                  message={errors.abilityTitle}
                />
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  label='Категория навыка'
                  placeholder='Выберите категорию навыка'
                  options={skillsOption}
                  onBlur={() => handleDropdownBlur('abilityOption')}
                  value={formData.abilityOption}
                  onChange={handleAbilityOptionChange}
                />
                {errors.abilityOption && (
                  <div id='abilityOption-error' className={styles.error}>
                    {errors.abilityOption}
                  </div>
                )}
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <Dropdown
                  label='Подкатегория навыка'
                  placeholder='Выберите подкатегорию навыка'
                  options={subSkillsOption}
                  value={formData.subAbilityOption}
                  onBlur={() => handleDropdownBlur('subSkillOption')}
                  onChange={handleSubAbilityOptionChange}
                />
                {errors.subAbilityOption && (
                  <div id='subAbilityOption-error' className={styles.error}>
                    {errors.subAbilityOption}
                  </div>
                )}
              </div>
              <div className={styles['register__form-input-wrapper']}>
                <label
                  htmlFor='description'
                  className={styles['register__form-label']}
                >
                  Описание
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className={styles['register__form-textarea-description']}
                  id='description'
                  onBlur={handleBlurDescription}
                  name='description'
                  placeholder='Коротко опишите, чему можете научить'
                ></textarea>
                {errors.description && (
                  <div id='description-error' className={styles.error}>
                    {errors.description}
                  </div>
                )}
              </div>
              <DragAndDrop
                multiple={true}
                ariaLabel={'drag-and-drop'}
                onFilesSelected={(files) =>
                  setFormData((prev) => ({
                    ...prev,
                    files: [...files]
                  }))
                }
              ></DragAndDrop>
            </div>
            <div className={styles['register__form-buttons-list-step-2']}>
              <Button
                className={styles['register__form-button']}
                type='secondary'
                size='medium'
                onClick={prevStep}
              >
                Назад
              </Button>
              <Button
                className={styles['register__form-button']}
                onClick={handleSkillsModalOpen}
                size='medium'
                disabled={isNextDisabled}
              >
                Продолжить
              </Button>
            </div>
            <ModalUI
              isOpen={modalIsOpenSkills}
              modalType='skill'
              title={'Ваше предложение'}
              subtitle='Пожалуйста, проверьте и подтвердите правильность данных'
              actionsPlacement='left'
              bodyTitle={formData.abilityTitle}
              category={abilityLabel}
              subcategory={subAbilityLabel}
              description={formData.description}
              aside={
                <AsideGallery
                  images={formData.files.map((file) =>
                    URL.createObjectURL(file)
                  )}
                  alt={formData.abilityTitle}
                />
              }
              actions={
                <>
                  <Button
                    onClick={handleSkillsModalClose}
                    type='secondary'
                    size='small'
                    iconName='edit-icon'
                    htmlType='button'
                  >
                    Редактировать
                  </Button>
                  <Button
                    htmlType='submit'
                    onClick={() => {
                      handleSkillsModalOpen();
                    }}
                    type='primary'
                    size='small'
                    disabled={isLoading}
                  >
                    Готово
                  </Button>
                </>
              }
              onClose={handleSkillsModalClose}
            />
            <ModalUI
              isOpen={modalIsOpenSuccess}
              modalType='success'
              title='Ваше предложение создано'
              subtitle='Теперь вы можете предложить обмен'
              statusIconName='done-icon'
              actions={
                <Button
                  type='primary'
                  fullWidth
                  htmlType='button'
                  onClick={() => {
                    handleSuccessModalClose();
                    handleCloseModalFull();
                  }}
                >
                  Готово
                </Button>
              }
              onClose={handleSuccessModalClose}
            />
          </form>
        </div>
        <div className={styles['register__form-step-card-wrapper']}>
          <StepCard
            title={steps.registration3.title}
            description={steps.registration3.description}
            imageSrc={steps.registration3.imageSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterFormStep3;
