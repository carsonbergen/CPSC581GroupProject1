import "./App.css";

import { useData } from "./DataContext";

import Quadrant from "./components/Quadrant/Quadrant";

// DEFINING FOOD QUADRANT ASSETS
import idleFoodCharacterPath from "./assets/food/idleCharacter.png";
import unselectedFoodQuadrantPath from "./assets/food/unselected.png";
// This can be set like the others as a file path once the real gif is added to the assets directory
const temporaryFoodGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXFtOGlwYXVodXp1NTlhMzNneWlsOTk3eXRydW1vdjNjMWhmZXd4eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/K4x1ZL36xWCf6/200.webp";

// DEFINING MUSIC QUADRANT ASSETS
import idleMusicCharacterPath from "./assets/music/lil_guy_music_idle.png";
import unselectedMusicQuadrantPath from "./assets/music/unselected.png";
// This can be set like the others as a file path once the real gif is added to the assets directory
import temporaryMusicGif from "./assets/music/pixil-playing_guitar.png";

// DEFINING SLEEP QUADRANT ASSETS
import idleSleepCharacterPath from "./assets/sleep/idleCharacter.png";
import unselectedSleepQuadrantPath from "./assets/sleep/unselected.png";
// This can be set like the others as a file path once the real gif is added to the assets directory
const temporarySleepGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2dmc2t3N29pbTd5MjNsNjg2YW5wM2xxdnoxMnQ1aXN3ZXhoN2NoaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QjdvZSi8f5JsXouSFp/200.webp";

// DEFINING WORKOUT QUADRANT ASSETS
import idleWorkoutCharacterPath from "./assets/workout/idleCharacter.png";
import unselectedWorkoutQuadrantPath from "./assets/workout/unselected.png";
import DraggableButton from "./components/DraggableButton/DraggableButton";
import StalkerButton from "./components/StalkerButton.tsx/StalkerButton";
// This can be set like the others as a file path once the real gif is added to the assets directory
const temporaryWorkoutGif =
  "https://media3.giphy.com/media/W7dBXzbnEpOBG/giphy.webp?cid=790b7611eoq6ivp1ebw9gc6oyq1qq5daq6u3z99eefcf2xkl&ep=v1_gifs_search&rid=giphy.webp&ct=g";

const OverlayButton = () => {
  const { setCharacterIdle } = useData();
  return (
    <div className="overlay-button-container">
      <button
        className="overlay-button"
        onClick={() => setCharacterIdle(false)}
      >
        ANIMATE
      </button>
    </div>
  );
};

function App() {
  // const { activeQuadrant, setActiveQuadrant } = useData();
  const { setCharacterIdle } = useData();

  return (
    <>
      <StalkerButton 
        onClick={() => setCharacterIdle(false)}
      />
      <DraggableButton disabled={false} />
      <div className="app-content">
        <div className="row">
          <div className="quadrant-container">
            <Quadrant
              index={1}
              unselectedQuadrantAssetPath={unselectedFoodQuadrantPath}
              idleCharacterAssetPath={idleFoodCharacterPath}
              animatedCharacterAssetPath={temporaryFoodGif}
            ></Quadrant>
          </div>
          <div className="quadrant-container">
            <Quadrant
              index={2}
              unselectedQuadrantAssetPath={unselectedMusicQuadrantPath}
              idleCharacterAssetPath={idleMusicCharacterPath}
              animatedCharacterAssetPath={temporaryMusicGif}
            ></Quadrant>
          </div>
        </div>
        <div className="row">
          <div className="quadrant-container">
            <Quadrant
              index={3}
              unselectedQuadrantAssetPath={unselectedSleepQuadrantPath}
              idleCharacterAssetPath={idleSleepCharacterPath}
              animatedCharacterAssetPath={temporarySleepGif}
            ></Quadrant>
          </div>
          <div className="quadrant-container">
            <Quadrant
              index={4}
              unselectedQuadrantAssetPath={unselectedWorkoutQuadrantPath}
              idleCharacterAssetPath={idleWorkoutCharacterPath}
              animatedCharacterAssetPath={temporaryWorkoutGif}
            ></Quadrant>
          </div>
        </div>
        {/* {activeQuadrant && <OverlayButton></OverlayButton>} */}
      </div>
    </>
  );
}

export default App;
