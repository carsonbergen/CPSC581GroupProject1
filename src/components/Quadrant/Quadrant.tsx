import './Quadrant.css'

import { useData } from '../../DataContext';

interface QuadrantProps {
  index: number;
  unselectedQuadrantAssetPath: string;
  idleCharacterAssetPath: string;
  animatedCharacterAssetPath: string;
}

const Quadrant: React.FC<QuadrantProps> = ({ index, unselectedQuadrantAssetPath, idleCharacterAssetPath, animatedCharacterAssetPath }) => {
  const { activeQuadrant, setActiveQuadrant, characterIdle, setCharacterIdle } = useData();

  const isActiveQuadrant = (): boolean => index === activeQuadrant; 

  return (
    <div className='content' onClick={() => !isActiveQuadrant() ? setActiveQuadrant(index) : setCharacterIdle(!characterIdle)}>
      <div className='asset-container'>
        {
          !isActiveQuadrant() &&
          <img src={unselectedQuadrantAssetPath}></img>
        }
        {
          (isActiveQuadrant() && characterIdle) &&
          <img src={idleCharacterAssetPath}></img>
        }
        {
          (isActiveQuadrant() && !characterIdle) &&
          <img src={animatedCharacterAssetPath}></img>
        }
      </div>
    </div>
  )
};

export default Quadrant
