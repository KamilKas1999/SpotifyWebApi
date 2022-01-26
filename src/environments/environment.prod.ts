export const environment = {
  production: true,
  spotifyApp: {
    client_id: 'c5de057c69af43f78132e18432ab8060',
    redirect_uri: getRedirectUri(),
    scope: 'user-top-read,user-library-modify,user-library-read',
    api: 'https://recommendmeamusic.herokuapp.com',
  },
};
function getRedirectUri() {
  return `${location.origin}/login/`;
}