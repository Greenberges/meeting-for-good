import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from '../styles/navbar.css';
import autobind from 'autobind-decorator';

import { getCurrentUser } from '../util/auth';

import '../styles/no-css-modules/mdl.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAvatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      user: false,
    };
  }

  async componentWillMount() {
    const user = await getCurrentUser();
    if (user) {
      const userAvatar = user.avatar;
      this.setState({ userAvatar, user: true });
    }
  }

  @autobind
  handleAuthClick() {
    if (!sessionStorage.getItem('redirectTo')) {
      sessionStorage.setItem('redirectTo', this.props.location.pathname);
    }
  }

  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <Link to="/" className="mdl-layout-title mdl-navigation__link">Lets Meet</Link>
          <div className="mdl-layout-spacer"></div>
          {this.state.user ?
            <div className="mdl-navigation">
              <Link className="mdl-navigation__link" to="/dashboard">Dashboard</Link>
              <a className="mdl-navigation__link" href="/api/auth/logout">Logout</a>
              <a className="mdl-navigation__link" href="#">
                <img
                  alt="avatar"
                  styleName="nav-img"
                  src={this.state.userAvatar}
                />
              </a>
            </div> :
            <div className="mdl-navigation">
              <a
                id="loginDropdown"
                className="mdl-navigation__link"
              >Login</a>

              <ul
                className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                htmlFor="loginDropdown"
              >
                <li className="mdl-menu__item">
                  <a
                    href="/api/auth/google"
                    onClick={this.handleAuthClick}
                  >Login with Google</a>
                </li>
                <li className="mdl-menu__item">
                  <a
                    href="/api/auth/facebook"
                    onClick={this.handleAuthClick}
                  >Login with Facebook</a>
                </li>
              </ul>
            </div>
          }
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  location: React.PropTypes.object,
};

export default cssModules(Navbar, styles);
