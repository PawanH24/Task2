export type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

export type UserCardProps = {
  id: number;
  name: string;
  email: string;
  company: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type PostCardProps = {
  title: string;
  body: string;
};
