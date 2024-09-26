import './Quadrant.css'

import { useData } from '../../DataContext';
import { useRef } from 'react';

interface QuadrantProps {
  index: number;
  unselectedQuadrantAssetPath: string;
  idleCharacterAssetPath: string;
  animatedCharacterAssetPath: string;
}

const Quadrant: React.FC<QuadrantProps> = ({ index, unselectedQuadrantAssetPath, idleCharacterAssetPath, animatedCharacterAssetPath }) => {
  const { activeQuadrant, characterIdle } = useData();

  const quadrantRef = useRef<HTMLDivElement>(null);

  const isActiveQuadrant = (): boolean => index === activeQuadrant;

  return (
    <div 
      className='content' 
      ref={quadrantRef}
    >
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
