const key = 'cineroll-data-v1';
export function load(){ try { return JSON.parse(localStorage.getItem(key)) || {movies:[], marathons:[]}; } catch { return {movies:[], marathons:[]}; } }
export function save(data){ localStorage.setItem(key, JSON.stringify(data)); }
export function reset(){ localStorage.setItem(key, JSON.stringify({movies:[], marathons:[]})); }
