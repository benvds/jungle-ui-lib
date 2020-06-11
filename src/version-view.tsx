import * as React from "react";

import { versionFormatted } from "./util";

import "./version-view.css";

export const VersionView: React.FC<{ text?: string }> = ({
  text = versionFormatted()
}) => <div className="version-view">{text}!</div>;
