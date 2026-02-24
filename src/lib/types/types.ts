/* Types from the backend repository */

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
  NoPhoto = "NoPhoto",
  NeedsPhotographer = "NeedsPhotographer",
  PhotographerAssigned = "PhotographerAssigned",
  PhotoComplete = "PhotoComplete",
}

export enum Roles {
  Author = "author",
  Editor = "editor",
  Photographer = "photographer",
  Developer = "developer",
  Designer = "designer",
  Admin = "admin",
}

export enum Category {
  Biology = "Biology",
  Chemistry = "Chemistry",
  Culture = "Culture",
  Environment = "Environment",
  Health = "Health",
  Local = "Local",
  Mathematics = "Mathematics",
  Neuroscience = "Neuroscience",
  Newsletter = "Newsletter",
  Opinion = "Opinion",
  Philosophy = "Philosophy",
  Physics = "Physics",
  Politics = "Politics",
  Psychology = "Psychology",
  Space = "Space",
  Technology = "Technology",
  World = "World",
  Uncategorized = "Uncategorized",
  Interview = "Interview",
}

export type ArticleContent = {
  contentType: "body_paragraph" | "pull_quote" | "image";
  content: string;
};

export type ArticleComment = {
  user: string;
  comment: string;
  commentStatus: CommentStatus;
  creationDate: Date;
  modificatonDate: Date;
};

export type ArticleSource = {
  text: string;
  href: string;
};

export type Article = {
  title: string;
  slug: string;
  issueNumber: number;
  categories: string[];
  articleContent: ArticleContent[];
  sources?: ArticleSource[];
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
