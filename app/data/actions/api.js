import axios from '../axios';

import { setToken } from './state';

export const passwordGrant = ({email, password }) => dispatch => {

	const data = {
		grant_type: 'password',
		client_id: 2,
		client_secret: 'bYUer2KEp4FD4rLH1QfqiBb4pABGxCfEImQk77AM',
		username: email,
		password: password,
		scope: '',
	}

	console.log(data);

	axios.post('/oauth/token', data).then(({ data }) => {
		const token = data;
		console.log(token);
		dispatch(setToken(token));
	});
};
