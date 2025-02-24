// lib/signals/clientSignals.svelte.js

import { getData, updateData } from '$lib/services/apiService.js';
import { getUserState } from '$lib/signals/appSignals.svelte.js';

let _clients = $state([]);
let _selectedClient = $state(null);
let _mode = $state(null);
let _matters = $state([]);
let _lawyers = $state([]);
let _charges = $state([]);
let _chargeTypes = $state([]);
let _statuses = $state([]);

export async function fetchInitialData({ fetch }) {
	const [clients, matters, lawyers, charges, chargeTypes, statuses] = await Promise.all([
		fetch('/api/legal?type=clients&limit=10').then((res) => res.json()),
		fetch('/api/legal?type=matters&limit=10').then((res) => res.json()),
		fetch('/api/legal?type=lawyers').then((res) => res.json()),
		fetch('/api/legal?type=charges').then((res) => res.json()),
		fetch('/api/legal?type=chargetypes').then((res) => res.json()),
		fetch('/api/legal?type=status').then((res) => res.json())
	]);
	_clients.splice(0, _clients.length, ...(clients || []));
	_matters.splice(0, _matters.length, ...(matters || []));
	_lawyers.splice(0, _lawyers.length, ...(lawyers || []));
	_charges.splice(0, _charges.length, ...(charges || []));
	_chargeTypes.splice(0, _chargeTypes.length, ...(chargeTypes || []));
	_statuses.splice(0, _statuses.length, ...(statuses || []));
}

export async function fetchClients({ fetch }, clientNumber = null) {
	let url = clientNumber
		? `/api/legal?type=clients&selected=${clientNumber}`
		: '/api/legal?type=clients&limit=10';
	const data = await fetch(url).then((res) => res.json());
	_clients.splice(0, _clients.length, ...(data || []));
}
export async function updateClient(data, action) {
	const mappedData = {
		clientname: data.clientName,
		clientnumber: data.clientNumber,
		address: data.address,
		telno: data.telNo,
		statusid: data.statusid
	};
	return await updateData('/api/legal?type=clients', mappedData, action);
}

export function setSelectedClient(client) {
	_selectedClient = client;
}

export function setMode(newMode) {
	_mode = newMode;
}

export function getClients() {
	return _clients;
}

export function getSelectedClient() {
	return _selectedClient;
}

export function getMode() {
	return _mode;
}

export function setClients(newClients) {
	_clients.splice(0, _clients.length, ...newClients);
}

export function getNextClientNumber() {
	return Math.max(..._clients.map((c) => c.clientnumber)) + 1 || 1;
}

export function getResetClient() {
	return {
		clientname: '',
		clientnumber: getNextClientNumber(),
		address: '',
		telno: '',
		statusid: 1
	};
}

export function getMatters() {
	return _matters;
}

export function getLawyers() {
	return _lawyers;
}

export function getCharges() {
	return _charges;
}

export function getChargeTypes() {
	return _chargeTypes;
}

export function getStatuses() {
	return _statuses;
}

export function getStatusName(statusId) {
	const status = getStatuses().find((s) => s.id === statusId);
	return status ? status.statusname : 'Unknown';
}
