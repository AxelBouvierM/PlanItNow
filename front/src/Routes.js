import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Landpage from './pages/Landpage'
import Home from './pages/Inicio'
import ErrorPage from './pages/NoPage'
import Agenda from './pages/Agenda'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Music from './pages/categories/Music'

import Footer from './components/footer/Footer'

const createRoutes = () => (
	  <BrowserRouter>
		<Routes>
		<Route index element={<Landpage />} />
		<Route path='/ingresar' element={<Login />} />
		<Route path='/registrarse' element={<Register />} />
		<Route path='/inicio' element={<Home />} />
		<Route path='/agenda' element={<Agenda />} />
		<Route path='/categorias' element={<Categories />} />
		<Route path='/categorias/musica' element={<Music />} />
		<Route path='/categorias/restaurant' element={<Music />} />
		<Route path='/categorias/teatro' element={<Music />} />
		<Route path='/categorias/deporte' element={<Music />} />
		<Route path='/categorias/danza' element={<Music />} />
		<Route path='/categorias/otros' element={<Music />} />
		<Route path='/categorias/cine' element={<Music />} />
		<Route path='/categorias/fiesta' element={<Music />} />
		<Route path='/categorias/cerveceria' element={<Music />} />
		<Route path='/categorias/cafeteria' element={<Music />} />
		<Route path='/categorias/museo' element={<Music />} />
		<Route path='/categorias/entretenimiento' element={<Music />} />
		<Route path='/perfil' element={<Profile />} />
		<Route path='*' element={<ErrorPage />} />
		</Routes>
	  </BrowserRouter>
  );

export default createRoutes
