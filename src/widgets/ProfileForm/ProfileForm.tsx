import { Avatar, Button, Dropdown, Icon, Input, Textarea } from '@/shared/ui';
import styles from './ProfileForm.module.css';
import {
  useState,
  useEffect,
  SyntheticEvent,
  useRef,
  useCallback
} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '@/features/auth';
import type { IUserUpdateData } from './types';

// Функция для валидации email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    city: '',
    about: '',
    avatar: ''
  });

  const [emailError, setEmailError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загрузка данных пользователя
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        birthDate: user.birthDate || '',
        gender: user.gender || '',
        city: user.city || '',
        about: user.about || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const isFormChanged =
    user &&
    (formValue.name !== user.name ||
      formValue.email !== user.email ||
      formValue.birthDate !== user.birthDate ||
      formValue.gender !== user.gender ||
      formValue.city !== user.city ||
      formValue.about !== user.about ||
      formValue.avatar !== user.avatar);

  const areRequiredFieldsFilled =
    formValue.name.trim() !== '' && formValue.email.trim() !== '';

  const isEmailValid = formValue.email === '' || isValidEmail(formValue.email);

  const isSubmitDisabled =
    !isFormChanged || !areRequiredFieldsFilled || !isEmailValid;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!areRequiredFieldsFilled || !isEmailValid || !user) {
      return;
    }

    const updateData: IUserUpdateData = {};

    // только измененные поля с правильным приведением типов
    if (formValue.name !== user.name) updateData.name = formValue.name;
    if (formValue.email !== user.email) updateData.email = formValue.email;
    if (formValue.birthDate !== user.birthDate)
      updateData.birthDate = formValue.birthDate;
    if (formValue.gender !== user.gender) {
      updateData.gender = formValue.gender as 'male' | 'female' | undefined;
    }
    if (formValue.city !== user.city) updateData.city = formValue.city;
    if (formValue.about !== user.about) updateData.about = formValue.about;
    if (formValue.avatar !== user.avatar) updateData.avatar = formValue.avatar;

    dispatch(
      updateUserThunk({
        id: user.id,
        data: updateData
      }) as any
    );
  };

  const handleInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = evt.target;
      setFormValue((prev) => ({
        ...prev,
        [name]: value
      }));

      if (name === 'email') {
        if (value && !isValidEmail(value)) {
          setEmailError('Введите корректный email адрес');
        } else {
          setEmailError('');
        }
      }
    },
    []
  );

  const handleDropdownChange = useCallback(
    (name: string) => (value: string | string[]) => {
      const selectedValue = Array.isArray(value) ? value[0] : value;

      setFormValue((prev) => ({
        ...prev,
        [name]: selectedValue === 'none' ? '' : selectedValue
      }));
    },
    []
  );

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormValue((prev) => ({
              ...prev,
              avatar: event.target?.result as string
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );
  return (
    <div className={styles['profile-info']}>
      <div className={styles['profile-form__wrapper']}>
        <form className={styles['profile-form']} onSubmit={handleSubmit}>
          <div className={styles['profile-form__field']}>
            <label htmlFor='email'>Почта</label>
            <Input
              icon={<Icon name='edit-icon' />}
              iconPosition='right'
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={formValue.email}
              onChange={handleInputChange}
              className={styles['profile-form__input']}
              required
              error={!!emailError}
              message={emailError}
            />
          </div>
          <Link to='/' className={styles['profile-form__link']}>
            Изменить пароль
          </Link>
          <div className={styles['profile-form__field']}>
            <label htmlFor='name'>Имя</label>
            <Input
              icon={<Icon name='edit-icon' />}
              iconPosition='right'
              id='name'
              name='name'
              type='text'
              placeholder='Имя'
              value={formValue.name}
              onChange={handleInputChange}
              className={styles['profile-form__input']}
              required
            />
          </div>
          <div className={styles['profile-form__row']}>
            <div className={styles['profile-form__field']}>
              <label htmlFor='date'>Дата рождения</label>
              <Input
                icon={<Icon name='calendar-icon' />}
                iconPosition='right'
                placeholder='дд.мм.гггг'
                id='birthDate'
                name='birthDate'
                type='date'
                value={formValue.birthDate}
                onChange={handleInputChange}
                className={styles['profile-form__input']}
              />
            </div>
            <div className={styles['profile-form__field']}>
              <label htmlFor='gender'>Пол</label>
              <Dropdown
                options={[
                  { value: 'male', label: 'Мужской' },
                  { value: 'female', label: 'Женский' },
                  { value: 'none', label: 'Не указан' }
                ]}
                value={formValue.gender}
                onChange={handleDropdownChange('gender')}
                placeholder='Выберите пол'
                fullWidth
              />
            </div>
          </div>
          <div className={styles['profile-form__field']}>
            <label htmlFor='city'>Город</label>
            <Dropdown
              options={[
                { value: 'Москва', label: 'Москва' },
                { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
                { value: 'Екатеринбург', label: 'Екатеринбург' },
                { value: 'Новосибирск', label: 'Новосибирск' },
                { value: 'Казань', label: 'Казань' }
              ]}
              value={formValue.city}
              onChange={handleDropdownChange('city')}
              placeholder='Выберите город'
              fullWidth
            />
          </div>
          <div className={styles['profile-form__field']}>
            <label htmlFor='about'>О себе</label>
            <Textarea
              icon={<Icon name='edit-icon' />}
              iconPosition='right'
              id='about'
              name='about'
              value={formValue.about}
              onChange={handleInputChange}
              placeholder='Расскажите о себе'
              className={styles['profile-form__textarea']}
            />
          </div>
          <Button
            className={styles['profile-form__submit-button']}
            type='primary'
            fullWidth
            disabled={isSubmitDisabled}
          >
            Сохранить
          </Button>
        </form>
      </div>
      <div className={styles['profile-form__avatar']}>
        <div className={styles['avatar-container']} onClick={handleAvatarClick}>
          {formValue.avatar ? (
            <Avatar
              src={formValue.avatar}
              alt='Аватар пользователя'
              className={styles.avatar}
            />
          ) : (
            <div className={styles['avatar-placeholder']}>
              <Icon name='user-icon' size={64} />
            </div>
          )}
          <div className={styles['avatar-overlay']}>
            <Icon name='gallery-edit-icon' size={16} />
          </div>
        </div>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleAvatarChange}
          accept='image/*'
          className={styles['avatar-input']}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
