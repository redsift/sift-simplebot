import React from 'react';
import Wizard from './Wizard';
import Page from './Page';
import OAuthdIdentityCard from './OAuthdIdentityCard';

import sizeMe from 'react-sizeme';

// import './styles/index.styl';

const OAUTHD_KEY = 'Qa7zbCXfaIjd8eJ1oAKY6nG3SEQ';
const OAUTHD_URL = 'https://oauth.redsift.io'; // FIXXME: how to distinguish between staging and production?

class ConnectedFirstUse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      twitterIdentity: null,
      angellistIdentity: null,
      slackIdentity: null
    };

    this._next = this._next.bind(this);
    this._skip = this._skip.bind(this);
    this._run = this._run.bind(this);
    this._onIdentityConnected = this._onIdentityConnected.bind(this);
  }

  render() {
    const { currentPage, twitterIdentity, angellistIdentity, slackIdentity } = this.state;
    const { size } = this.props;

    const isMicro = size.width <= 232;

    return (
      <Wizard currentPage={currentPage}>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-connected"></div>

            <div className="page__heading">
              <h3>Welcome to your <strong>Connected</strong> Sift!</h3>
            </div>

            { isMicro ? (
              <div className="page__content">
                <p>Attach social account to run <strong>Connected</strong> Sift</p>
              </div>
            ) : (
              <div className="page__content">
                <p>Inbox priorization and personal assistant based on social signals</p>
                <div className="page__header-icon -rs-icon-dashboard"></div>
              </div>
            )}

            <p className="page__description">To get started connect 1 or more social accounts.</p>

            <div className="page__buttons">
              {isMicro ? (
                <button onClick={this._next} className="rs-btn--green rs-btn--small">Next</button>
              ) : (
                <button onClick={this._next} className="rs-btn--green">Next</button>
              )}
            </div>
          </div>
        </Page>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-connected"></div>

            <div className="page__heading">
              <h3>Social Account Connections</h3>
            </div>

            <div className="page__content">

            <div className="connected__federated-buttons">
              <OAuthdIdentityCard
                small={isMicro}
                icon="-rs-icon-twitter"
                label="Connect Twitter"
                onConnected={this._onIdentityConnected}
                providerId="twitter"
                oauthdKey={OAUTHD_KEY}
                oauthdUrl={OAUTHD_URL}
              />

              <OAuthdIdentityCard
                small={isMicro}
                icon="-rs-icon-angellist"
                label="Connect AngelList"
                onConnected={this._onIdentityConnected}
                providerId="angel_list"
                oauthdKey={OAUTHD_KEY}
                oauthdUrl={OAUTHD_URL}
              />
            </div>

            </div>

            <p className="page__description">To get started connect 1 or more social accounts.</p>

            <div className="page__buttons">
              { isMicro ? (
                <button className="rs-btn--green rs-btn--small" disabled>Next</button>
              ) : (
                <button className="rs-btn--green" disabled>Next</button>
              )}
            </div>
          </div>
        </Page>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-connected"></div>

            <div className="page__heading">
              <h3>Social Account Connections</h3>
            </div>

            <div className="page__content">

              <div className="connected__federated-buttons">
                <OAuthdIdentityCard
                  small={isMicro}
                  icon="-rs-icon-twitter"
                  label="Connect Twitter"
                  description="Improve results by connecting to Twitter."
                  identity={twitterIdentity}
                  onConnected={this._onIdentityConnected}
                  providerId="twitter"
                  oauthdKey={OAUTHD_KEY}
                  oauthdUrl={OAUTHD_URL}
                />

                <OAuthdIdentityCard
                  small={isMicro}
                  icon="-rs-icon-angellist"
                  label="Connect AngelList"
                  description="Improve results by connecting to AngelList."
                  identity={angellistIdentity}
                  onConnected={this._onIdentityConnected}
                  providerId="angel_list"
                  oauthdKey={OAUTHD_KEY}
                  oauthdUrl={OAUTHD_URL}
                />
              </div>

            </div>

            <p className="page__description">Optionally connect another social account to prioritize your inbox.</p>

            <div className="page__buttons">
              {isMicro ? (
                <button onClick={() => this._goto(7)} className="rs-btn--green rs-btn--small">Next</button>
              ) : (
                <button onClick={this._next} className="rs-btn--green">Next</button>
              )}
            </div>
          </div>
        </Page>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-connected"></div>

            <div className="page__heading">
              <h3>Social Account Connections</h3>
            </div>

            <div className="page__content">

              <div className="connected__federated-buttons">
                <OAuthdIdentityCard
                  small={isMicro}
                  icon="-rs-icon-twitter"
                  label="Connect Twitter"
                  description="Improve results by connecting to Twitter."
                  identity={twitterIdentity}
                />

                <OAuthdIdentityCard
                  small={isMicro}
                  icon="-rs-icon-angellist"
                  label="Connect AngelList"
                  description="Improve results by connecting to AngelList."
                  identity={angellistIdentity}
                />
              </div>

            </div>

            <p className="page__description">Super! Your Twitter and AngelList accounts are now linked!</p>

            <div className="page__buttons">
              {isMicro ? (
                <button onClick={() => this._goto(7)} className="rs-btn--green rs-btn--small">Next</button>
              ) : (
                <button onClick={this._next} className="rs-btn--green">Next</button>
              )}
            </div>
          </div>
        </Page>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-connected"></div>

            <div className="page__heading">
              <h3>Here is how it looks</h3>
            </div>

            <div className="page__content">

              <div className="connected__federated-buttons">
                <img width="70%" src="https://static.redsift.io/assets/redsift-web/images/-rs-image-crx-taxi-screenshot.png" />
              </div>

            </div>

            <p className="page__description">Data insights insid of Gmail helping you prioritize!</p>

            <div className="page__buttons">
              <button onClick={this._next} className="rs-btn--green">Next</button>
            </div>
          </div>
        </Page>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-redsift-red"></div>

            <div className="page__heading">
              <h3>Connected Bot on Slack</h3>
            </div>

            <div className="page__content">
              <OAuthdIdentityCard
                small={isMicro}
                icon="-rs-icon-slack"
                label="Connect Slack"
                onConnected={this._onIdentityConnected}
                providerId="slack"
                oauthdKey={OAUTHD_KEY}
                oauthdUrl={OAUTHD_URL}
              />
            </div>

            <p className="page__description">Connect with Slack and use our bot to discover insights by asking questions.</p>

            <div className="page__buttons">
              <button onClick={this._next} className="rs-btn--green">Skip</button>
            </div>
          </div>
        </Page>

        <Page>
          <div className="page">
            <div className="page__header-icon -rs-icon-connected"></div>

            <div className="page__heading">
              <h3>You're ready to roll</h3>
            </div>

            <div className="page__content">
              {(slackIdentity) ?
                isMicro ? (
                  <p>Great! You're all setup and ready to run <strong>Connected</strong> Sift.</p>
                ) : (
                  <div className="connected__federated-buttons">
                    <OAuthdIdentityCard
                      small={isMicro}
                      icon="-rs-icon-slack"
                      identity={slackIdentity}
                    />
                  </div>
                ) : isMicro ? (
                  <p>Great! You're ready to run <strong>Connected</strong> Sift.</p>
                ) : (
                  <div className="page__header-icon -rs-icon-redsift-red"></div>
                )}
            </div>

            {(slackIdentity) ? (
              <p className="page__description">Great! You can now run the <strong>Connected</strong> Sift in Gmail and Slack.</p>
            ) : (
              <p className="page__description">Great! You can now run the <strong>Connected</strong> Sift in Gmail.</p>
            )}

            <div className="page__buttons">
              {isMicro ? (
                <button onClick={this._run} className="rs-btn--green rs-btn--small">Run</button>
              ) : (
                <button onClick={this._run} className="rs-btn--green">Run</button>
              )}
            </div>
          </div>
        </Page>

      </Wizard>
    );
  }

  _next() {
    const currentPage = this.state.currentPage + 1;
    this.setState({ currentPage });
  }

  _skip() {
    const currentPage = this.state.currentPage + 2;
    this.setState({ currentPage });
  }

  _goto(numPage) {
    const currentPage = numPage;
    this.setState({ currentPage });
  }

  _run() {
    alert('RUNNING SIFT!');
  }

  _onIdentityConnected(providerId, identity) {
    console.log('connected OAuth: ', providerId, identity);
    this.setState({ [providerId + 'Identity']: identity });

    this._next();
  }
}

export default sizeMe()(ConnectedFirstUse);
