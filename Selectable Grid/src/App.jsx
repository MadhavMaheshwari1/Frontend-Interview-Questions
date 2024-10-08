import './App.css'
import SelectableGrid from './components/SelectableGrid'

function App() {

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <SelectableGrid rows={20} cols={20} />
    </div>
  )
}

export default App
