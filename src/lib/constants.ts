export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  NEW_NOTE: '/notes/new',
  NOTE_PARAM: '/notes/:noteId',
  NOTE: (noteId: string) => `/notes/${noteId}`,
};
