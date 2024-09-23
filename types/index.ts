

export type User = {
  username: string;
  avatar: string;
};
export type Post = {
  $id: string;
  title: string;
  video: string;
  thumbnail: string;
  creator: User;
};

export type FormCreateContentProps = {
  title: string;
  video: any;
  thumbnail: any;
  propt: string;
  userId?: string
};