import axios from '../axios';

import { setToken, addUser } from './state';

export const passwordGrant = ({email, password }) => dispatch => {

	const data = {
		grant_type: 'password',
		client_id: 2,
		client_secret: 'bYUer2KEp4FD4rLH1QfqiBb4pABGxCfEImQk77AM',
		username: email,
		password: password,
		scope: '',
	}

	axios.post('/oauth/token', data).then(({ data }) => {
		dispatch(setToken(data));
	});
};

export const getUser = (token) => dispatch => {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}

	axios.get('api/user', '', config).then(({ data }) => {
		dispatch(addUser(data));
	});
}
