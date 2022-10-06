export default class APIService {
	// Insert an article
	static SendUserInput(body) {
		return fetch(`http://localhost:5000/loginData`, {
			'method': 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.catch(error => console.log(error))
	}
}
