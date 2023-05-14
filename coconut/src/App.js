
import './App.css';
import DragAndDrop from './components/DragAndDrop';
import Header from './components/Header';

function App() {
  return (
    <div >
      <div className='text-center'>
      <Header />
      </div>
    <div className="centered">
    
    <DragAndDrop />
   </div>
   </div>
  );
}

export default App;
