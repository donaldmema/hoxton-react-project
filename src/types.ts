export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CharacteristicsItem = {
  id: number;
  userId: number;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;
};

export type CommentItem = {
  id: number;
  content: string;
  postId: number;
};

export type PostItem = {
  id: number;
  caption: string;
  imageUrl: string;
  userId: number;
  username: string;
  createdAt: string;
  comments: {
    id: number;
    content: string;
    postId: number;
  }[];
};
