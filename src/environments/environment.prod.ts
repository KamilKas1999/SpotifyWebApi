export const environment = {
  production: true,
  spotifyApp: {
    client_id: 'c5de057c69af43f78132e18432ab8060',
    redirect_uri: getRedirectUri(),
    scope:
      'user-top-read,user-read-private,app-remote-control,user-library-modify,user-library-read,playlist-modify-public,playlist-modify-private,streaming',
    api: 'https://recommendmeamusic.herokuapp.com',
  },
};
function getRedirectUri() {
  return `${location.origin}/login/`;
}
