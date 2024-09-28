import "./App.css";

import { useData } from "./DataContext";

import Quadrant from "./components/Quadrant/Quadrant";

// DEFINING FOOD QUADRANT ASSETS
import idleFoodCharacterPath from "./assets/food/idleCharacter.png";
import unselectedFoodQuadrantPath from "./assets/food/unselected.png";
import foodAnimationPath from "./assets/food/animation.gif";

// DEFINING MUSIC QUADRANT ASSETS
import idleMusicCharacterPath from "./assets/music/idleCharacter.png";
import unselectedMusicQuadrantPath from "./assets/music/unselected.png";
import musicAnimationPath from "./assets/music/animation.gif";

// DEFINING PROGRAMMING QUADRANT ASSETS
import idleProgrammingCharacterPath from "./assets/programming/idleCharacter.png";
import unselectedProgrammingQuadrantPath from "./assets/programming/unselected.png";
import programmingAnimationPath from "./assets/programming/animation.gif";

// DEFINING WORKOUT QUADRANT ASSETS
import idleWorkoutCharacterPath from "./assets/workout/idleCharacter.png";
import unselectedWorkoutQuadrantPath from "./assets/workout/unselected.png";
import workoutAnimationPath from "./assets/workout/animation.gif";

import DraggableButton from "./components/DraggableButton/DraggableButton";
import StalkerButton from "./components/StalkerButton.tsx/StalkerButton";

function App() {
  const { setCharacterIdle, characterIdle } = useData();

  return (
    <>
      <StalkerButton 
        onClick={() => setCharacterIdle(!characterIdle)}
      />
      <DraggableButton disabled={false} />
      <div className="app-content">
        <div className="row">
          <div className="quadrant-container">
            <Quadrant
              index={1}
              unselectedQuadrantAssetPath={unselectedFoodQuadrantPath}
              idleCharacterAssetPath={idleFoodCharacterPath}
              animatedCharacterAssetPath={foodAnimationPath}
            ></Quadrant>
          </div>
          <div className="quadrant-container">
            <Quadrant
              index={2}
              unselectedQuadrantAssetPath={unselectedMusicQuadrantPath}
              idleCharacterAssetPath={idleMusicCharacterPath}
              animatedCharacterAssetPath={musicAnimationPath}
            ></Quadrant>
          </div>
        </div>
        <div className="row">
          <div className="quadrant-container">
            <Quadrant
              index={3}
              unselectedQuadrantAssetPath={unselectedProgrammingQuadrantPath}
              idleCharacterAssetPath={idleProgrammingCharacterPath}
              animatedCharacterAssetPath={programmingAnimationPath}
            ></Quadrant>
          </div>
          <div className="quadrant-container">
            <Quadrant
              index={4}
              unselectedQuadrantAssetPath={unselectedWorkoutQuadrantPath}
              idleCharacterAssetPath={idleWorkoutCharacterPath}
              animatedCharacterAssetPath={workoutAnimationPath}
            ></Quadrant>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
