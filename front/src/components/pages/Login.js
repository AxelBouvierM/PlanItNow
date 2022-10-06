import { useState, useEffect } from 'react'
//import axios from "axios";
import ArticleList from '../login/ArticleList'
import Form from '../login/Form'

function Login() {
	const [articles, setArticles] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetch('http://localhost:5000/loginData', {
			'methods': 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => setArticles(response))
			.catch(error => console.log(error))
		}, [])

	// update the existing article list
	const insertedArticle = (article) => {
		const new_articles = [...articles, article]
		setArticles(new_articles)
	}

	const toggleShowForm = () => {
		setShowForm(!showForm);
	}

	return (
			<div className="container">
				<div className="row p-3">
					<div className="text-center">
						<h1>Post data from React to Flask.</h1>
						<button	onClick={toggleShowForm} className="btn btn-primary">Ingresar</button>
					</div>
				</div>
				<ArticleList articles={articles} />
				{showForm && (<Form	insertedArticle={insertedArticle} />)}
			</div>
	);
}

// GET DATA FROM BACKEND

	/*const [isRegistered, setIsRegistered] = useState(null)

	function getData() {
		axios({
			method: "GET",
			url: "/loginData",
		})
			.then((response) => {
				const res = response.data
				setIsRegistered(({
					userlogged: res.logged,
				}))
			}).catch((error) => {
				if (error.response) {
					console.log(error.response)
					console.log(error.response.status)
					console.log(error.response.headers)
				}
			})
	}
	return (
		<div>
			<p>Check if GET from front works:</p><button onClick={getData}>Click me</button>
				{isRegistered && <div><p>User logged?: {isRegistered.userlogged}</p></div>}
		</div>
	);
}*/

export default Login;
