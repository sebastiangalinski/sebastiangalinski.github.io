export function ProjectView({ project, children }) {
  return (
    <article className="project" id={`project-${project.id}`}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-links">
        {project.links.map((link) => (
          <a className="button button-secondary" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
            {link.label} →
          </a>
        ))}
        {children}
      </div>
    </article>
  );
}
