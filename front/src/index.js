import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Landpage from './pages/Landpage'
import Home from './pages/Inicio'
import ErrorPage from './pages/NoPage'
import Agenda from './pages/Agenda'
import Cuenta from './pages/Cuenta'
import Configuracion from './pages/Configuracion'
import Login from './pages/Login'
import Register from './pages/Register'

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/categorias' element={<Agenda />} />
        <Route path='/cuenta' element={<Cuenta />} />
        <Route path='/configuracion' element={<Configuracion />} />
        <Route path='/register' element={<Register />} />
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
