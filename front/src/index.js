import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Home from './pages/Inicio'
import ErrorPage from './pages/NoPage'
import Agenda from './pages/Agenda'
import Profile from './pages/Profile'
import Configuracion from './pages/Configuracion'
import Categories from './pages/Categories'

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/profile' element={<Profile />} />
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