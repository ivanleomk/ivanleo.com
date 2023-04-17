import { Env } from "./env";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
