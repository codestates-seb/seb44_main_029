export type Musics = Array<string>;

export type LoginInfo = {
  email: string;
  password: string;
};

export type SignUpInfo = {
  username: string;
  email: string;
  password: string;
};

export type ItemType = {
  contentId: number;
  themeTitle: string;
  howManyLiked: number;
  contentTitle: string;
  contentUri: string;
};

export type PageInfo = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type EditType = {
  imageUrl: string | null;
  username: string | null;
};
