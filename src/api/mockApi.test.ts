import { getSkills, getUsers, getUserById, getSkillById } from './mockApi';

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
});
