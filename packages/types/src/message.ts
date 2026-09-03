export type Sender = "ai" | "user";

export interface Message {
  id: string;

  interviewId: string;

  sender: Sender;

  content: string;

  createdAt: Date;
}