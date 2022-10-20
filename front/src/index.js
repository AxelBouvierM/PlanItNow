import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Landpage from './pages/Landpage'
import Home from './pages/Inicio'
import ErrorPage from './pages/NoPage'
import Agenda from './pages/Agenda'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Music from './pages/categories/Music'

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landpage />} />
        <Route path='/entrar' element={<Login />} />
        <Route path='/registrarse' element={<Register />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/categorias' element={<Categories />} />
        <Route path='/categorias/musica' element={<Music />} />
        <Route path='/categorias/restaurant' element={<Music />} />
        <Route path='/categorias/teatros' element={<Music />} />
        <Route path='/categorias/deportes' element={<Music />} />
        <Route path='/categorias/bailes' element={<Music />} />
        <Route path='/categorias/otros' element={<Music />} />
        <Route path='/categorias/cines' element={<Music />} />
        <Route path='/categorias/fiestas' element={<Music />} />
        <Route path='/categorias/cervecerias' element={<Music />} />
        <Route path='/categorias/cafeterias' element={<Music />} />
        <Route path='/categorias/museos' element={<Music />} />
        <Route path='/categorias/entretenimiento' element={<Music />} />
        <Route path='/perfil' element={<Profile />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
