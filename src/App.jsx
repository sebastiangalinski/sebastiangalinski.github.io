import { useState } from "react";
import { projects } from "./model/projectData.js";
import { CausticsView } from "./view/causticsView.jsx";
import { CountryguessrView } from "./view/countryguessrView.jsx";
import { LifeMemoView } from "./view/LifeMemoView.js";
import { NordicGambitView } from "./view/nordicGambitView.jsx";
import { TbaProjectView } from "./view/TbaProjectView.jsx";
import { WasteClassificationView } from "./view/wasteClassificationView.jsx";

const viewTypes = {
  caustics: CausticsView,
  countryguessr: CountryguessrView,
  "waste-classification": WasteClassificationView,
  "nordic-gambit": NordicGambitView,
  "life-memo": LifeMemoView,
  "drivr": TbaProjectView,
  "movement-smoothing-tank-simulation": TbaProjectView
};

function ForestBackground() {
  return (
    <div className="forest-background" aria-hidden="true">
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <div className="tree-line tree-line-back" />
      <div className="tree-line tree-line-front" />
      <span className="firefly firefly-one" />
      <span className="firefly firefly-two" />
      <span className="firefly firefly-three" />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <>
      <ForestBackground />
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

      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Media technology · Computer Graphics · Sustainable Design</p>
          <h1>Sebastian Galinski</h1>
          <p>Developer, problem solver, and builder of interactive experiences.</p>
        </div>
      </header>

      <main>
        {activeTab === "projects" ? (
          <section aria-labelledby="projects-heading">
            <h2 id="projects-heading">Selected projects</h2>
            <div className="project-list">
              {projects.map((project) => {
                const View = viewTypes[project.id];
                if (!View) {
                  throw new Error(`No React view registered for project "${project.id}"`);
                }
                return <View key={project.id} project={project} />;
              })}
            </div>
          </section>
        ) : (
          <section aria-labelledby="about-heading">
            <h2 id="about-heading">About me</h2>
            <p>I'm a student Media technolgy student interested in computer graphics, sustainable design, and interactive systems.</p>
            <a className="button button-secondary" href="https://www.linkedin.com/in/sebastian-galinski" target="_blank" rel="noopener noreferrer">
              My LinkedIn profile →
            </a>
          </section>
        )}
      </main>

      <footer><p>© 2026 Sebastian Galinski</p></footer>
    </>
  );
}

export default App;
