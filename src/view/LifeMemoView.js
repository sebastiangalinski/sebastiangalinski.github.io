import React from "react";
import { ProjectView } from "./ProjectView.jsx";

export function LifeMemoView({ project }) {
  return React.createElement(
    ProjectView,
    { project },
    React.createElement(
      "a",
      {
        className: "button button-secondary",
        href: "https://mimmielsa.github.io/LifeMemo/",
        target: "_blank",
        rel: "noopener noreferrer"
      },
      "Visit LifeMemo →"
    )
  );
}
