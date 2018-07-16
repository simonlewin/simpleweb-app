import axios from '../axios';

// import state actions
import { setToken, addName } from './state';

// import client_id and client_secret
import { CLIENT_ID, CLIENT_SECRET } from '../config';

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
	console.log('in passwordGrant ', data);
	axios.post('/oauth/token', data).then(({ data }) => {
		dispatch(setToken(data));
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

	axios.get('api/user', config).then(({ data }) => {
		dispatch(addName(data));
	});
}

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
			console.log(error);	
		});
}
