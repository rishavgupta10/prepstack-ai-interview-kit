import { Logger } from "winston";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        userId: string;
      };
      id: string;
      log: Logger;
    }
  }
}

export {};
