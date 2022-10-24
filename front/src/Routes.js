import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Favicon from 'react-favicon';
import icon from './images/favicon.ico';

import Landpage from './pages/Landpage'
import Home from './pages/Inicio'
import ErrorPage from './pages/NoPage'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Cafeteria from './pages/categories/Cafeteria'
import Cerveceria from './pages/categories/Cerveceria'
import Cine from './pages/categories/Cine'
import Danza from './pages/categories/Danza'
import Deporte from './pages/categories/Deporte'
import Entretenimiento from './pages/categories/Entretenimiento'
import Fiesta from './pages/categories/Fiesta'
import Museo from './pages/categories/Museo'
import Musica from './pages/categories/Musica'
import Otros from './pages/categories/Otros'
import Restaurant from './pages/categories/Restaurant'
import Teatro from './pages/categories/Teatro'

const createRoutes = () => (
	<>
	<Favicon url={icon}></Favicon>
	<React.StrictMode>
	  <BrowserRouter>
		<Routes>
		<Route index element={<Landpage />} />
		<Route path='/ingresar' element={<Login />} />
		<Route path='/registrarse' element={<Register />} />
		<Route path='/inicio' element={<Home />} />
		<Route path='/categorias' element={<Categories />} />
		<Route path='/categorias/musica' element={<Musica />} />
		<Route path='/categorias/cafeteria' element={<Cafeteria />} />
		<Route path='/categorias/cerveceria' element={<Cerveceria />} />
		<Route path='/categorias/danza' element={<Danza />} />
		<Route path='/categorias/restaurant' element={<Restaurant />} />
		<Route path='/categorias/teatro' element={<Teatro />} />
		<Route path='/categorias/deporte' element={<Deporte />} />
		<Route path='/categorias/otros' element={<Otros />} />
		<Route path='/categorias/cine' element={<Cine />} />
		<Route path='/categorias/fiesta' element={<Fiesta />} />
		<Route path='/categorias/museo' element={<Museo />} />
		<Route path='/categorias/entretenimiento' element={<Entretenimiento />} />
		<Route path='/perfil' element={<Profile />} />
		<Route path='*' element={<ErrorPage />} />
		</Routes>
	  </BrowserRouter>
	</React.StrictMode>
	</>
  );

export default createRoutes
/* 
*/ 
