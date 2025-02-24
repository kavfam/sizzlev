export function logoutUser(event) {
	event.cookies.delete('user', { path: '/' });
	return { success: true };
}
