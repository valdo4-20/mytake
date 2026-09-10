const API = globalThis.MYTAKE_API_BASE || '/api/tmdb';
const TMDB_DIRECT = 'https://api.themoviedb.org/3';
const image = (path, size = 'w780') => path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=780&q=80';

async function request(path) {
  const token = localStorage.getItem('mytake-tmdb-token') || '';
  const base = token ? TMDB_DIRECT : API;
  const headers = {accept: 'application/json'};
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${base}${path}`, {headers});
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) throw new Error('A API TMDB não respondeu em JSON. Verifique o token ou o endereço do proxy.');
  if (!response.ok) throw new Error(response.status === 503 ? 'O TMDB ainda não foi configurado neste servidor.' : 'Não foi possível consultar o TMDB agora.');
  return response.json();
}

export async function searchTmdb(query) {
  const data = await request(`/search/multi?query=${encodeURIComponent(query)}&language=pt-BR&include_adult=false`);
  return data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv').slice(0, 8).map(item => ({id: `${item.media_type}-${item.id}`, type: item.media_type, title: item.title || item.name, year: (item.release_date || item.first_air_date)?.slice(0,4) || '—', poster: image(item.poster_path, 'w342')}));
}

export async function fetchTmdbMovie(id, type = 'movie') {
  const m = await request(`/${type}/${id}?language=pt-BR&append_to_response=credits`);
  const director = m.credits?.crew?.find(person => person.job === 'Director')?.name || 'Não informado';
  const title = m.title || m.name;
  return {id: `tmdb-${type}-${m.id}`, tmdbId: m.id, mediaType: type, title, originalTitle: m.original_title || m.original_name || title, year: (m.release_date || m.first_air_date)?.slice(0,4) || '', runtime: m.runtime || m.episode_run_time?.[0] || 0, genres: m.genres?.map(g => g.name) || [], director, synopsis: m.overview || '', communityRating: m.vote_average ? Math.round(m.vote_average * 10) / 10 : null, userRating: null, status: 'watchlist', favorite: false, watchedCount: 0, watchedDates: [], review: '', notes: '', tags: [], poster: image(m.poster_path), backdrop: image(m.backdrop_path, 'original')};
}

export async function discoverTmdb({movieGenres = [], tvGenres = [], excludeMovies = [], excludeTv = []} = {}) {
  const params = (type, genres, excluded) => `language=pt-BR&sort_by=popularity.desc&vote_count.gte=80${genres.length ? `&with_genres=${genres.join('|')}` : ''}${excluded.length ? `&without_id=${excluded.join('|')}` : ''}`;
  const requests = [
    request(`/discover/movie?${params('movie', movieGenres, excludeMovies)}`),
    request(`/discover/tv?${params('tv', tvGenres, excludeTv)}`)
  ];
  const [movies, series] = await Promise.all(requests);
  return [
    ...(movies.results || []).map(item => ({id: `movie-${item.id}`, type: 'movie', title: item.title, year: item.release_date?.slice(0, 4) || '—', poster: image(item.poster_path, 'w342'), rating: item.vote_average, genres: item.genre_ids || []})),
    ...(series.results || []).map(item => ({id: `tv-${item.id}`, type: 'tv', title: item.name, year: item.first_air_date?.slice(0, 4) || '—', poster: image(item.poster_path, 'w342'), rating: item.vote_average, genres: item.genre_ids || []}))
  ].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12);
}
