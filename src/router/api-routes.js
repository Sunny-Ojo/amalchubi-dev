const base_url = 'http://194.195.214.39';
const jsonServer = 'http://localhost:4000';

//authentication routes

//register api
export const registerUserUrl = `api/user/register`;
export const loginUserUrl = `/api/user/login`;

//end of authentication routes

//user api routes
export const deleteUserUrl = (id) => `${jsonServer}/users/${id}`;
// export const deleteUserUrl = (id) => `${base_url}/admin/user/${id}`;
export const updateUserUrl = (id) => `${jsonServer}/users/${id}`;
// export const updateUserUrl = (id) => `${base_url}/admin/user/update/${id}`;
export const viewUserUrl = (id) => `/api/user/${id}`;
export const listUsersUrl = `/api/user`;

//user api routes
export const deleteProfessionsUrl = (id) => `/api/profession/${id}`;
export const updateProfessionsUrl = (id) =>
	`${base_url}/admin/professions/update/${id}`;
export const viewProfessionsUrl = (id) => `/api/profession/${id}`;
export const listProfessionsUrl = `/api/profession?status=true`;
export const addProfessionUrl = `/api/profession`;

//blogs
export const listBlogsUrl = `/api/blog`;
export const listBlogPagesUrl = (page) => `/api/blog?page=${page}`;
export const deleteBlogUrl = (id) => `/api/blog/${id}`;
export const addBlogUrl = `/api/blog`;
export const getBlogDetailsUrl = (id) => `/api/blog/${id}`;
export const updateBlogDetailsUrl = (id) => `/api/blog/${id}`;

//posts
export const listPostsUrl = `/api/post`;
export const listPostPagesUrl = (page) => `/api/post?page=${page}`;
export const deletePostUrl = (id) => `/api/post/${id}`;
export const addPostUrl = `/api/post`;
export const getPostDetailsUrl = (id) => `/api/post/${id}`;
export const updatePostDetailsUrl = (id) => `/api/post/${id}`;
