// appSignals.svelte.js

import { setSelectedClient } from '$lib/signals/clientSignals.svelte.js';

let _userState = $state({ id: null, email: '', security_level: null, loggedIn: false });
let _sidebarState = $state({ isOpen: false });
let _alertState = $state({ alertMsg: '', alertMode: '', alertShow: false });

export function getUserState() {
	return _userState;
}

export function setUserState(newState) {
	_userState = { ..._userState, ...newState };
}

export function getSidebarState() {
	return _sidebarState;
}

export function toggleNav(isOpen) {
	_sidebarState.isOpen = isOpen;
}

export function logoutUser() {
	setUserState({ id: null, email: '', security_level: null, loggedIn: false });
	setSelectedClient(null);
	if (typeof window !== 'undefined') {
		window.location.href = '/';
	}
}

export function getAlertState() {
	return _alertState;
}

export function toggleAlert({ alertMsg, alertMode, alertShow }) {
	_alertState = { alertMsg, alertMode, alertShow };
}

// Missing setAlertStateItem—adding now
export function setAlertStateItem(key, value) {
	_alertState[key] = value;
}
