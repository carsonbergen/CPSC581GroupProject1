import './App.css'

import { useData } from './DataContext';

function App() {
  // const { activeQuadrant, setActiveQuadrant, characterIdle, setCharacterIdle } = useData();

  return (
    <div className='app-content'>
      <div className='row'>
        <div className='quadrant-container'></div>
        <div className='quadrant-container'></div>
      </div>
      <div className='row'>
        <div className='quadrant-container'></div>
        <div className='quadrant-container'></div>
      </div>
    </div>
  )
}

export default App
