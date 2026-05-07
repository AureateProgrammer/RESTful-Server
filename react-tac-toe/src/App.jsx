import './App.css'
import Header from "./components/Header.jsx"
import Player from "./components/Player.jsx"
import Board from "./components/Board.jsx"
import PlayerStatus from './components/PlayerStatus.jsx'


function App() {
  return (
    <div>
      <Header />
      <Player whichPlayer='X'/>
      <Player whichPlayer='O'/>
      <PlayerStatus/>
      <Board/>
    </div>
  )
}

export default App