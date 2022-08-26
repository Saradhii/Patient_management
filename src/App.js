import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Todo from './components/Patients/Patients';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import UpdateTodo from './components/Patients/Medicine';
import Medicine from './components/Patients/Medicine';


function App() {
  return (
    <>
    <Header/>
    <Routes>
        <Route default path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/patients' element={<Todo/>}/>
        <Route path='/medicine/:id'element={<Medicine/>}/>
    </Routes>
    </>
  );
}

export default App;
