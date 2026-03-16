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
  Pending = "pending",
  Print = "print",
  Online = "online",
}

export enum WritingStatus {
  NeedsEditor = "needs_editor",
  HasEditor = "has_editor",
  RoughDraftComplete = "rough_draft_complete",
  EditsComplete = "edits_complete",
  CopyEditsComplete = "copy_edits_complete",
  EICApproved = "eic_approved",
  Dropped = "dropped",
}

export enum DesignStatus {
  NeedsDesigner = "needs_designer",
  HasDesigner = "has_designer",
  InProgress = "in_progress",
  Completed = "completed",
}

export enum PhotographyStatus {
  NoPhoto = "no_photo",
  NeedsPhotographer = "needs_photographer",
  PhotographerAssigned = "photographer_assigned",
  PhotoComplete = "photo_complete",
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
}

export type ArticleContentSegment = {
  contentType: "body_paragraph" | "pull_quote" | "image";
  content: string;
  href?: string;
};

// A paragraph is an array of segments
export type ArticleContent = ArticleContentSegment[];

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
