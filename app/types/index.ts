import { Conversation, Message, User } from '@prisma/client';

export type MessageType = Message & {
  sender: User;
  seen: User[];
};

export type ConversationType = Conversation & {
  messages: MessageType[];
  users: User[];
};
