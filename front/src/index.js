import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Home from './components/pages/Inicio'
import ErrorPage from './components/pages/NoPage'
import Agenda from './components/pages/Agenda'
import Sala from './components/pages/Sala'
import Cuenta from './components/pages/Cuenta'
import Configuracion from './components/pages/Configuracion'

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/sala' element={<Sala />} />
        <Route path='/cuenta' element={<Cuenta />} />
        <Route path='/configuracion' element={<Configuracion />} />
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
