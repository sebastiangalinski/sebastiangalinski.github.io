export function TimelineView({ projects, activeProjectId, onSelectProject }) {
  return (
    <aside className="timeline" aria-label="Project timeline">
      <p className="timeline-label">Timeline</p>
      <ol>
        {projects.map((project, index) => {
          const isFirstProjectInYear =
            index === 0 || projects[index - 1].year !== project.year;

          return (
            <li className="timeline-entry" key={project.id}>
              {isFirstProjectInYear && <p className="timeline-year">{project.year}</p>}
              <button
                className={`timeline-item ${activeProjectId === project.id ? "active" : ""}`}
                type="button"
                aria-current={activeProjectId === project.id ? "step" : undefined}
                onClick={() => onSelectProject(project.id)}
              >
                <span className="timeline-marker" aria-hidden="true" />
                <span className="timeline-text">{project.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
