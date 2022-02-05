export const environment = {
  production: false,
  spotifyApp: {
    client_id: 'c5de057c69af43f78132e18432ab8060',
    redirect_uri: getRedirectUri(),
    scope: 'user-top-read,user-read-private,app-remote-control,user-library-modify,user-library-read,playlist-modify-public,playlist-modify-private,streaming',
    api: 'http://192.168.0.139:8080',
  },
};

function getRedirectUri() {
  return `${location.origin}/login/`;
}
