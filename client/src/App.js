import {  BrowserRouter , Route , Routes  } from 'react-router-dom'

import LandinPage from './components/LandingPage';
import Home from './components/Home';
import Create from './components/Create';
import Recipe from './components/Recipe';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandinPage/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/create' element={<Create/>}/>
        <Route path='/recipes/:idReceta' element={<Recipe/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
