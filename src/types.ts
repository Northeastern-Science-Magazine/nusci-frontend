export enum ArticleContentType {
  BodyParagraph,
  PullQuote,
  Image,
}

export enum CommentStatus {
  Resolved,
  Unresolved,
  Public,
}

export enum ArticleStatus {
  Pending,
  Print,
  Online,
}

export enum WritingStatus {
  NeedsEditor,
  HasEditor,
  RoughDraftComplete,
  EditsComplete,
  CopyEditsComplete,
  EICApproved,
  Dropped,
}

export enum DesignStatus {
  NeedsDesigner,
  HasDesigner,
  InProgress,
  Completed,
}

export enum PhotographyStatus {
  NoPhoto,
  NeedsPhotographer,
  PhotographerAssigned,
  PhotoComplete,
}

export type ArticleContent = {
  contentType: ArticleContentType;
  content: string;
};

export type ArticleComment = {
  user: string;
  comment: string;
  commentStatus: CommentStatus;
  creationDate: Date;
  modificatonDate: Date;
};

export type Article = {
  title: string;
  slug: string;
  issueNumber: number; // what's the diff between lowercase and uppercase number?
  categories: string[];
  articleContent: ArticleContent[];
  sources?: string[];
  link?: string;
  pageLength: number;
  comments: ArticleComment[];
  articleStatus: ArticleStatus;
  writingStatus: WritingStatus;
  designStatus: DesignStatus;
  photographyStatus: PhotographyStatus;
  authors: string[];
  editors: string[];
  designers: string[];
  photographers: string[];
  approvingUser: string;
  approvalTime?: Date;
  creationTime: Date;
  modificationTime: Date;
};
