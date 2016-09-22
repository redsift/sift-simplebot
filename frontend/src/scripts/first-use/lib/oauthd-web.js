// import OAuthIO from 'oauthio-web';

export default class OAuthdWeb {
  constructor({ key, url }) {
    OAuth.initialize(key);
    OAuth.setOAuthdURL(url);
  }

  popup(provider) {
    console.log('[OAuthdWeb::popup]: ', provider);

    const state = '1938342'; // FIXXME!

    return new Promise((resolve, reject) => {
      OAuth.popup(provider, { state }).done((service) => {
        // console.log('[OAuthdWeb::popup]: success: ', service);
        const token = {
          access_token: service.access_token,
          oauth_token: service.oauth_token,
          oauth_token_secret: service.oauth_token_secret
        };

        service.me().done((me) => {
          // console.log('[OAuthdWeb::popup]: me: ', me);
          resolve({
            token,
            profile: me
          });
        }).fail((e) => {
          console.error('[OAuthdWeb::popup]: me failed: ', provider);
          reject(e);
        });
      }).fail(function (e) {
        console.error('[OAuthdWeb::popup]: popup failed: ', provider);
        reject(e);
      });
    });
  }

}
