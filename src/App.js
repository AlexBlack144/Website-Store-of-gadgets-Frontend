import './App.css';
import Main from "./pages/Main";
import Regist from './pages/Regist';
import Login from './pages/Login';
import Manager from './pages/Manager';
import History from './pages/History';
import RegistManager from './pages/RegistManager';
import Сharacteristic from './pages/Сharacteristic';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Main/>}></Route>
         <Route path='/regist' element={<Regist/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/manager' element={<Manager/>}></Route>
         <Route path='/history' element={<History/>}></Route>
         <Route path='/registManager' element={<RegistManager/>}></Route>
         <Route path='/characteristic/:idGadget' element={<Сharacteristic/>}></Route>
       </Routes>
     </BrowserRouter>
  );
}

export default App;
