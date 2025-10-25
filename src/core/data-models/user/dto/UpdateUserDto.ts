export interface UpdateUserDto {
  name?: string;
  avatar?: string;
  password?: string;
  type?: 'ordinary' | 'pro';
}
