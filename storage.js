// storage.js
const API_BASE = null;
const STORAGE_KEY = 'pickupapp_events_v1';

export const demoChildren = [
  {id: 'c1', name: 'Andrei Pop'},
  {id: 'c2', name: 'Maria Ionescu'},
  {id: 'c3', name: 'Ioan Georgescu'}
];

export const timeNow = () => new Date().toISOString();
export const humanTime = (iso) => new Date(iso).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

export async function getEvents() { /* same as before */ }
export async function saveEvent(evt) { /* same as before */ }
export async function updateEvent(id, patch) { /* same as before */ }
