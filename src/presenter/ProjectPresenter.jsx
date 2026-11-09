import { useEffect, useState } from "react";
import { projects, sortProjectsByDate } from "../model/projectData.js";
import { LifeMemoView } from "../view/LifeMemoView.js";
import { ProjectView } from "../view/ProjectView.jsx";
import { NordicGambitView } from "../view/nordicGambitView.jsx";
import { TimelineView } from "../view/TimelineView.jsx";

const viewTypes = {
  "nordic-gambit": NordicGambitView,
  "life-memo": LifeMemoView
};

const sortedProjects = sortProjectsByDate(projects);

function useProjectTimeline(projectList) {
  const [activeProjectId, setActiveProjectId] = useState(projectList[0]?.id);

  useEffect(() => {
    const projectElements = projectList
      .map((project) => document.getElementById(`project-${project.id}`))
      .filter(Boolean);

    if (!projectElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleProject = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleProject) {
          setActiveProjectId(visibleProject.target.id.replace("project-", ""));
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    projectElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [projectList]);

  const selectProject = (projectId) => {
    document.getElementById(`project-${projectId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    setActiveProjectId(projectId);
  };

  return { activeProjectId, selectProject };
}

export function ProjectPresenter() {
  const { activeProjectId, selectProject } = useProjectTimeline(sortedProjects);

  return (
    <section className="projects-panel" aria-labelledby="projects-heading">
      <TimelineView
        projects={sortedProjects}
        activeProjectId={activeProjectId}
        onSelectProject={selectProject}
      />
      <div className="projects-content">
        <h2 id="projects-heading">Project Archive</h2>
        <div className="project-list">
          {sortedProjects.map((project) => {
            const View = viewTypes[project.id] || ProjectView;
            return <View key={project.id} project={project} />;
          })}
        </div>
      </div>
    </section>
  );
}
