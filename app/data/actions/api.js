import axios from '../axios';

// import state actions
import { setToken, addName, setError } from './state';

// import client_id and client_secret
import { CLIENT_ID, CLIENT_SECRET } from '../config';

import { SecureStore } from 'expo';

_storeEmail = async (email, password) => {
	await SecureStore.setItemAsync('email', email);
	await SecureStore.setItemAsync('password', password);
};

// oauth password grant - POST /oauth/token
export const passwordGrant = ({ email, password }) => dispatch => {

	const data = {
		grant_type: 'password',
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		username: email,
		password: password,
		scope: '',
	}

	axios.post('/oauth/token', data)
		.then(({ data }) => {
			console.log(email, password);
			_storeEmail(email, password);
			dispatch(setToken(data));
		})
		.catch(error => {
			if (error.response) {
				// request was made and the server responded with a status code !== 2xx
				const { status, data } = error.response;
				dispatch(setError(status, data));
			} else if (error.request) {
				// request was made but no response was received
				// console.log(error.request);
			} else {
				// something else happened in setting up the request that triggered an error
				// console.log(error.message);
			}
			// console.log(error.config);
		});
};
	
// GET /api/user
export const getUser = token => dispatch => {

	const config = {
		headers: {
			Accept: 'application/json',
			Authorization: 'Bearer ' + token,
		}
	}

	axios.get('api/user', config)
		.then(({ data }) => {
			dispatch(addName(data));
		})
		.catch(error => {
			if (error.response) {
				// console.log(error.request.data);
			} else if (error.request) {
				// console.log(error.request);
			} else {
				// console.log(error.message);
			}
			// console.log(error.config);
		});
};

export const postRegister = data => dispatch => {	

	const config = {
		headers: {
			Accept: 'application/json',
		}
	}

	const { password } = data;

	axios.post('api/register', data, config)
		.then(({ data }) => {

			const grantData = {
				email: data.data.email,
				password: password,
			}

			dispatch(passwordGrant(grantData));
		})
		.catch((error) => {
			if (error.response) {
				// console.log(error.request.data);
			} else if (error.request) {
				// console.log(error.request);
			} else {
				// console.log(error.message);
			}
			// console.log(error.config);
		});
};
