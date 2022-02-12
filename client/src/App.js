import {  BrowserRouter , Route , Routes  } from 'react-router-dom'

import LandinPage from './components/LandingPage';
import Home from './components/Home';
import Create from './components/Create';

//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandinPage/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/Create' element={<Create/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
