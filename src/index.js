import { config } from "./config";

export const logVersion = () => console.log(`version: ${config.version}`);
