import {
  getSkills,
  getUsers,
  getUserById,
  getSkillById,
  registerUser,
  loginUser,
  updateUser,
  mockUsers
} from './mockApi';
import { IUser } from './types';

jest.useFakeTimers();

describe('mockApi', () => {
  test('getSkills возвращает массив навыков', async () => {
    const promise = getSkills();
    jest.runAllTimers();
    const skills = await promise;
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
    expect(skills[0]).toHaveProperty('title');
  });

  test('getUsers возвращает массив пользователей', async () => {
    const promise = getUsers();
    jest.runAllTimers();
    const users = await promise;
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('teachingSkillId');
  });

  test('getUserById возвращает пользователя по id', async () => {
    const promise = getUserById(1);
    jest.runAllTimers();
    const user = await promise;
    expect(user).not.toBeNull();
    expect(user).toHaveProperty('id', 1);
  });

  test('getUserById возвращает null если пользователя нет', async () => {
    const promise = getUserById(9999);
    jest.runAllTimers();
    const user = await promise;
    expect(user).toBeNull();
  });

  test('getSkillById возвращает навык по id', async () => {
    const promise = getSkillById(1);
    jest.runAllTimers();
    const skill = await promise;
    expect(skill).not.toBeNull();
    expect(skill).toHaveProperty('id', 1);
  });

  test('getSkillById возвращает null если навыка нет', async () => {
    const promise = getSkillById(9999);
    jest.runAllTimers();
    const skill = await promise;
    expect(skill).toBeNull();
  });

  test('registerUser присваивает id = 1 если mockUsers пуст', async () => {
    const originalUsers = [...mockUsers];
    mockUsers.length = 0;

    const newUser: Omit<IUser, 'id'> = {
      name: 'Новый пользователь',
      email: 'new@example.com',
      password: '123456',
      gender: 'male',
      city: 'Москва',
      birthDate: '1990-01-01',
      teachingSkillId: 1,
      learningSkillIds: [],
      about: '',
      avatar: ''
    };

    const promise = registerUser(newUser);
    jest.runAllTimers();
    const user = await promise;

    expect(user).toHaveProperty('id', 1);
    expect(user.email).toBe(newUser.email);

    mockUsers.length = 0;
    mockUsers.push(...originalUsers);
  });

  test('registerUser успешно регистрирует нового пользователя', async () => {
    const newUser: Omit<IUser, 'id'> = {
      name: 'Тестовый',
      email: 'testuser@example.com',
      password: '123456',
      gender: 'male',
      city: 'Москва',
      birthDate: '1990-01-01',
      teachingSkillId: 1,
      learningSkillIds: [2],
      about: 'about',
      avatar: 'image'
    };
    const promise = registerUser(newUser);
    jest.runAllTimers();
    const user = await promise;
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(newUser.email);
  });

  test('registerUser отклоняется если email уже используется', async () => {
    const existingUser: Omit<IUser, 'id'> = {
      name: 'Елена',
      email: 'elena3@example.com',
      password: '123456',
      gender: 'female',
      city: 'Новосибирск',
      birthDate: '1998-02-11',
      teachingSkillId: 3,
      learningSkillIds: [16],
      about: 'Профессионально обучаю техникам работы с возражениями.',
      avatar:
        'https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?q=80&w=687&auto=format&fit=crop'
    };
    const promise = registerUser(existingUser);
    jest.runAllTimers();
    await expect(promise).rejects.toThrow('Email уже используется');
  });

  test('loginUser успешно авторизует с правильным email и паролем', async () => {
    const promise = loginUser('elena3@example.com', '123456');
    jest.runAllTimers();
    const user = await promise;
    expect(user).toHaveProperty('email', 'elena3@example.com');
  });

  test('loginUser отклоняется при неверном email или пароле', async () => {
    const promise = loginUser('elena3@example.com', 'wrongpassword');
    jest.runAllTimers();
    await expect(promise).rejects.toThrow('Неверный email или пароль');
  });

  test('updateUser успешно обновляет данные пользователя', async () => {
    const updatedData = { city: 'Екатеринбург', name: 'Елена Новая' };
    const promise = updateUser(3, updatedData);
    jest.runAllTimers();
    const user = await promise;
    expect(user).not.toBeNull();
    expect(user?.city).toBe('Екатеринбург');
    expect(user?.name).toBe('Елена Новая');
  });

  test('updateUser возвращает null если пользователь не найден', async () => {
    const promise = updateUser(9999, { city: 'Москва' });
    jest.runAllTimers();
    const user = await promise;
    expect(user).toBeNull();
  });

  test('updateUser отклоняется если email используется другим пользователем', async () => {
    const promise = updateUser(1, { email: 'elena3@example.com' });
    jest.runAllTimers();
    await expect(promise).rejects.toThrow(
      'Email уже используется другим пользователем'
    );
  });
});
