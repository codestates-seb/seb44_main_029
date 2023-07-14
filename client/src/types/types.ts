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

export interface ItemInfo {
  contentId: number;
  themeTitle: string;
  liked: boolean;
  howManyLiked: number;
  contentTitle: string;
  contentUri: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IThemeItemProps {
  data: ItemInfo[];
  pageInfo: PageInfo;
}
