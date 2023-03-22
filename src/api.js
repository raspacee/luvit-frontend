export const baseUrl = process.env.NODE_ENV == 'production' ? 'https://luvit-backend.onrender.com' : 'http://localhost:4000'

export const api = {
	friendsUrl: baseUrl + '/api/friends',
	registerUrl: baseUrl + '/api/register',
	signinUrl: baseUrl + '/api/login',
	friendRequestsUrl: baseUrl + '/api/friendrequests',
	searchUrl: baseUrl + '/api/search'

};