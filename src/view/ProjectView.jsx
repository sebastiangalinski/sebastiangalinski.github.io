import { useState } from "react";

export function getToggleLabel(isOpen, label) {
  return `${isOpen ? "Close" : "Open"} ${label} ${isOpen ? "▲" : "▼"}`;
}

export function ProjectView({ project, children }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoLink = project.links.find((link) => link.video);

  return (
    <article className="project" id={`project-${project.id}`}>
      <h3>
        <a className="project-title" href={`#project-${project.id}`}>
          {project.title}
        </a>
      </h3>
      <p>{project.description}</p>
      <div className="project-links">
        {project.links.map((link) => (
          link.disabled ? (
            <button className="button button-secondary" type="button" disabled key={link.label}>
              {link.label}
            </button>
          ) : link.video ? (
            <button
              className="button button-primary demo-toggle"
              type="button"
              aria-expanded={isVideoOpen}
              onClick={() => setIsVideoOpen((isOpen) => !isOpen)}
              key={link.href}
            >
              {getToggleLabel(isVideoOpen, link.label)}
            </button>
          ) : (
            <a className="button button-secondary" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
              {link.label} →
            </a>
          )
        ))}
        {children}
      </div>
      {isVideoOpen && videoLink && (
        <div className="documentary-frame demo-frame">
          <div className="documentary-toolbar">
            <span>Now playing: {videoLink.videoTitle}</span>
          </div>
          <div className="embed-wrapper">
            <video controls>
              <source src={videoLink.href} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        </div>
      )}
    </article>
  );
}
