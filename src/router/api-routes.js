const base_url = 'http://127.0.0.1:8000/api/';
const jsonServer = 'http://localhost:4000';

//user api routes
export const deleteUserUrl = (id) => `${jsonServer}/users/${id}`;
// export const deleteUserUrl = (id) => `${base_url}/admin/user/${id}`;
export const updateUserUrl = (id) => `${jsonServer}/users/${id}`;
// export const updateUserUrl = (id) => `${base_url}/admin/user/update/${id}`;
export const viewUserUrl = (id) => `${base_url}/admin/user/details/${id}`;
export const listUsersUrl = `${base_url}/admin/user`;
export const createUserUrl = `${jsonServer}/users`;

//user api routes
export const deleteProfessionsUrl = (id) =>
	`${base_url}/admin/professions/delete/${id}`;
export const updateProfessionsUrl = (id) =>
	`${base_url}/admin/professions/update/${id}`;
export const viewProfessionsUrl = (id) =>
	`${base_url}/admin/professions/details/${id}`;
export const listProfessionsUrl = `${base_url}/admin/professions`;
