(function () {
  var config = window.CLARA_MONDAY_CONFIG || {};
  var clientId = config.clientId;

  if (!clientId || clientId === 'PASTE_CLIENT_ID_HERE') {
    return;
  }

  var installUrl =
    'https://auth.monday.com/oauth2/authorize?client_id=' +
    encodeURIComponent(clientId);

  document.querySelectorAll('.clara-install').forEach(function (el) {
    el.setAttribute('href', installUrl);
  });
})();
