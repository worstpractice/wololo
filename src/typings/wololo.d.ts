import { Wololo } from "../constants";

export type Commands = typeof Wololo[keyof typeof Wololo];
