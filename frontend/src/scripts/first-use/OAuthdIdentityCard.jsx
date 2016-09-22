import React from 'react';
import OAuthdWeb from './lib/oauthd-web';

export default class OAuthdIdentityCard extends React.Component {
  constructor(props) {
    super(props);

    this._oauthdWeb = null;

    if (props.oauthdKey && props.oauthdUrl) {
      this._oauthdWeb = new OAuthdWeb({ key: props.oauthdKey, url: props.oauthdUrl });
    }

    this._getIdentity = this._getIdentity.bind(this);

    this._setupState(props, true);
  }

  _setupState(props, init = false) {
    const state = {
      identity: props.identity,
      error: null
    }

    if (init) {
      this.state = state;
    } else {
      this.setState(state);
    }
  }

  componentWillReceiveProps(nextProps) {
    this._setupState(nextProps);
  }

  render() {
    const { icon, label, description, small } = this.props;
    const { identity, error } = this.state;

    if (error) {
      return (
        <p>{JSON.stringify(error, null, 4)}</p>
      );
    }

    if (!identity) {
      return (
        <div className="identity-card--disconnected">
          <a className="rs-icon-btn" onClick={this._getIdentity}>
            <div className="rs-icon-btn__icon__wrapper">
              <div className="rs-icon-btn__icon__wrapper__padding">
                <div className={`rs-icon-btn__icon ${icon}`}></div>
              </div>
            </div>
            <div className="rs-icon-btn__label">
              <div>{label}</div>
            </div>
          </a>

          { small ? null : (
            <p className="identity-card--disconnected__description">{description}</p>
          )}
        </div>
      );
    } else {
      const { alias, avatar } = this.state.identity.profile;

      let button = small ? (
        <div className="identity-card--disconnected">
          <a className="rs-icon-btn rs-icon-btn--selected">
            <div className="rs-icon-btn__icon__wrapper">
              <div className="rs-icon-btn__icon__wrapper__padding">
                <div className={`rs-icon-btn__icon ${icon}`}></div>
              </div>
            </div>
            <div className="rs-icon-btn__label">
              <div>{label}</div>
            </div>
          </a>
        </div>
      ) : (
        <div className="identity-card">
          <div className="identity-card__avatar"><img src={avatar} /></div>
          <div className="identity-card__alias">{alias}</div>
          <div className="identity-card__icon -rs-icon-slack"></div>
        </div>
      )

      return button;
    }
  }

  _getIdentity() {
    const { providerId, onConnected } = this.props;

    const popup = this._oauthdWeb.popup(providerId).then((identity) => {
      this.setState({ identity });
      if (onConnected) {
        onConnected(providerId, identity);
      } else {
        console.log('[OAuthdIdentityCard] No handler for "onConnected". Add the property <OAuthdIdentityCard onConnected={myHandler} ...> if you want to handle the event. We happily continue, just wanted to let you know...');
      }
    }).catch((err) => {
      this.setState({ error: err });
    });
  }
}

OAuthdIdentityCard.propTypes = {
  icon: React.PropTypes.string,
  label: React.PropTypes.string,
  description: React.PropTypes.string,
  onConnected: React.PropTypes.func,
  providerId: React.PropTypes.string,
  oauthdKey: React.PropTypes.string,
  oauthdUrl: React.PropTypes.string
};
