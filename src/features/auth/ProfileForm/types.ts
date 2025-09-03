export interface IUserUpdateData {
  name?: string;
  email?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | undefined;
  city?: string;
  about?: string;
  avatar?: string;
}
