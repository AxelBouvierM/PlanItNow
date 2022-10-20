import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../components/header/NavBar'

function Music() {
	const [data, setData] = useState([]);
	
	useEffect(() => {
		axios.get('/data/music')
			.then((res) => setData(res.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log(data);
  	return (
		<>
			<NavBar />
		</>
		

  	)
}

export default Music
