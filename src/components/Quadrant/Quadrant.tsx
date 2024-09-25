import './Quadrant.css'

import { useData } from '../../DataContext';
import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../MouseContext';
import { between } from '../../util/between';

interface QuadrantProps {
  index: number;
  unselectedQuadrantAssetPath: string;
  idleCharacterAssetPath: string;
  animatedCharacterAssetPath: string;
}

const Quadrant: React.FC<QuadrantProps> = ({ index, unselectedQuadrantAssetPath, idleCharacterAssetPath, animatedCharacterAssetPath }) => {
  const { activeQuadrant, setActiveQuadrant, characterIdle, setCharacterIdle } = useData();

  const { mousePosition } = useMousePosition();

  const quadrantRef = useRef<HTMLDivElement>(null);

  const isActiveQuadrant = (): boolean => index === activeQuadrant;
  const updateActiveQuadrant = () => {
    if (quadrantRef && quadrantRef.current) {
      let boundingRect = quadrantRef.current.getBoundingClientRect();
      if (
        between(mousePosition.x, boundingRect.x, boundingRect.x + boundingRect.width) &&
        between(mousePosition.y, boundingRect.y, boundingRect.y + boundingRect.height)
      ) {
        setActiveQuadrant(index);
        setCharacterIdle(true);
      }
    }
  };

  useEffect(() => {
    updateActiveQuadrant();
  }, [mousePosition]);

  return (
    <div 
      className='content' 
      onMouseDown={() => updateActiveQuadrant()}
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
