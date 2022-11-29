export type CreateUserParams = {
  email: string;
  password: string;
}

export type UpdateUserParams = {
  email: string,
  password: string;
}

export type CreatePostParams = {
  title: string;
  content: string;
}
export type AddRoleParams = {
  value: string;
  userId: number;
}

export type CreateRoleParams = {
  value: string;
  description: string;
}
export type BanUserParams = {
  userId: number;
  banReason: string;
}