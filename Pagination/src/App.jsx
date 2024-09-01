import './App.css';
import HomePage from './components/HomePage';

function App() {

  return (
    <div className="App">
      <HomePage itemsPerPage={20}/>
    </div>
  )
}

export default App
