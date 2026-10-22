import { useState } from "react";
import { ProjectView } from "./ProjectView.jsx";

export function NordicGambitView({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProjectView project={project}>
      <button
        className="button button-primary documentary-toggle"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Close documentary ▲" : "Open interactive documentary ▼"}
      </button>
      {isOpen && (
        <div className="documentary-frame">
          <div className="documentary-toolbar">
            <span>Now playing: The Nordic Gambit</span>
          </div>
          <div className="embed-wrapper">
            <iframe
              src="https://player.stornaway.io/embed/be9415bf"
              title="The Nordic Gambit interactive documentary"
              allowFullScreen
              allow="accelerometer; gyroscope; autoplay; xr-spatial-tracking;"
            />
          </div>
        </div>
      )}
    </ProjectView>
  );
}
