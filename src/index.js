import { config } from "./config";

export const logVersion = () => console.log(versionFormatted());

export const versionFormatted = () => `version: ${config.version}`;
