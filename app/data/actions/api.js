import axios from '../axios';

// import state actions
import { setToken, addUser } from './state';

// import client_id and client_secret
import { CLIENT_ID, CLIENT_SECRET } from '../client';

// oauth password grant - POST /oauth/token
export const passwordGrant = ({email, password }) => dispatch => {

	const data = {
		grant_type: 'password',
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		username: email,
		password: password,
		scope: '',
	}

	axios.post('/oauth/token', data).then(({ data }) => {
		// dispatch signInRequested
		dispatch(setToken(data));
	});
};

// GET /api/user
export const getUser = (token) => dispatch => {
	
	const config = {
		headers: {
			Accept: 'application/json',
			Authorization: 'Bearer ' + token
		}
	}

	axios.get('api/user', config).then(({ data }) => {
		dispatch(addUser(data));
	});
}

export const postRegister = data => dispatch => {
	
	const config = {
		headers: {
			'Accept': 'application/json',
		}
	}

	const { email, password } = data;

	axios.post('api/register', data, config).then(({ data }) => {
		// passwordGrant(data.email, password)
	});
}