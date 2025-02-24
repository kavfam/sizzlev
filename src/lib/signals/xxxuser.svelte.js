import { signal } from '@preact/signals-core';

export const user = signal(JSON.parse(localStorage.getItem('user')) || null);

export function loginUser(data) {
	user.value = data;
	localStorage.setItem('user', JSON.stringify(data));
}

export function logoutUser() {
	user.value = null;
	localStorage.removeItem('user');
}
