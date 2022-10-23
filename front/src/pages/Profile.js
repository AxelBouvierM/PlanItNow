import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();

	axios.get('/login/check')
		.then((res) => {
			if (res.data.response.status === 'User not logged in') navigate('/ingresar');
		})
		.catch((err) => {
			console.log(err);
		});
	return <h1>PAGINA PROFILE</h1>;
};

export default Profile;
