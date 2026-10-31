import { useEffect, useState } from "react";
import { projects, sortProjectsByDate } from "../model/projectData.js";
import { CausticsView } from "../view/causticsView.jsx";
import { CountryguessrView } from "../view/countryguessrView.jsx";
import { LifeMemoView } from "../view/LifeMemoView.js";
import { NordicGambitView } from "../view/nordicGambitView.jsx";
import { TimelineView } from "../view/TimelineView.jsx";
import { TbaProjectView } from "../view/TbaProjectView.jsx";
import { WasteClassificationView } from "../view/wasteClassificationView.jsx";

const viewTypes = {
  caustics: CausticsView,
  countryguessr: CountryguessrView,
  "waste-classification": WasteClassificationView,
  "nordic-gambit": NordicGambitView,
  "life-memo": LifeMemoView,
  drivr: TbaProjectView,
  "interpolation-perception-investigation": TbaProjectView
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

function ProjectsPanel() {
  const { activeProjectId, selectProject } = useProjectTimeline(sortedProjects);

  return (
    <section className="projects-panel" aria-labelledby="projects-heading">
      <TimelineView
        projects={sortedProjects}
        activeProjectId={activeProjectId}
        onSelectProject={selectProject}
      />
      <div className="projects-content">
        <h2 id="projects-heading">Selected projects</h2>
        <div className="project-list">
          {sortedProjects.map((project) => {
            const View = viewTypes[project.id];
            if (!View) {
              throw new Error(`No React view registered for project "${project.id}"`);
            }
            return <View key={project.id} project={project} />;
          })}
        </div>
      </div>
    </section>
  );
}

function AboutPanel() {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">About me</h2>
      <p>I'm a student Media technolgy student interested in computer graphics, sustainable design, and interactive systems.</p>
      <a className="button button-secondary" href="https://www.linkedin.com/in/sebastian-galinski" target="_blank" rel="noopener noreferrer">
        My LinkedIn profile →
      </a>
    </section>
  );
}

export function PortfolioPresenter() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <>
      <nav aria-label="Main navigation">
        <div className="nav-inner">
          {[
            ["projects", "Projects"],
            ["about", "About Me"]
          ].map(([tabId, label]) => (
            <button
              className={`nav-link ${activeTab === tabId ? "active" : ""}`}
              type="button"
              aria-selected={activeTab === tabId}
              key={tabId}
              onClick={() => setActiveTab(tabId)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
      <main>
        {activeTab === "projects" ? <ProjectsPanel /> : <AboutPanel />}
      </main>
    </>
  );
}
