import * as React from "react";

import { versionFormatted } from "./util";

export const VersionView: React.FC<{ text: string }> = ({
  text = versionFormatted()
}) => <div>{text}!</div>;
