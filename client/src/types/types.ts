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

export type EditType = {
  imageUrl: string | null;
  username: string | null;
};

export interface FetchThemeItemProps {
  data: ItemInfo[];
  pageInfo: PageInfo;
}

export type FormData = {
  file: any;
  themeId: string;
};
