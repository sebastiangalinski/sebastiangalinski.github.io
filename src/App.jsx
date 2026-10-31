import { PortfolioPresenter } from "./presenter/PortfolioPresenter.jsx";
import { IntroView } from "./view/IntroView.jsx";

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
  return (
    <>
      <ForestBackground />
      <IntroView />
      <PortfolioPresenter />
      <footer><p>© 2026 Sebastian Galinski</p></footer>
    </>
  );
}

export default App;
