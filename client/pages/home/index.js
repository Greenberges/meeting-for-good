import React from 'react';
import { browserHistory } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './home.css';
import { isAuthenticated } from '../../util/auth';

class Home extends React.Component {
  async componentWillMount() {
    if (sessionStorage.getItem('redirectTo')) {
      browserHistory.push(sessionStorage.getItem('redirectTo'));
      sessionStorage.removeItem('redirectTo');
    }

    if (await isAuthenticated()) browserHistory.push('/dashboard');
  }

  render() {
    return (
      <div styleName="main">
        <header styleName="header">
          <h2>LetsMeet</h2>
          <hr />
          <h6>The best meeting coordination app</h6>
          <img
            src={require('../../assets/dashboard-banner.png')}
            alt="dashboard"
          />
        </header>
        <div styleName="content">
          <h3>Easy event creation</h3>
          <h6>Creating an event is easy as saying 1, 2, 3.</h6>
          <img src={require('../../assets/main-banner.png')} alt="new event" />
          <hr styleName="hr" />
          <h3>Entering your availabily is a breeze</h3>
          <h6>Using our simplistic availabily grid, entering your availabily just got easier</h6>
          <img src={require('../../assets/enteravail.gif')} styleName="gif" alt="enter availabily" />
          <hr styleName="hr" />
          <h3>Timezones supported</h3>
          <h6>Don&#39;t worry about having to get everyone to convert to your timezone. Let us take of it!</h6>
          <img src={require('../../assets/timezones.png')} styleName="timezones" alt="timezone" />
          <p><small>Same event. Image on the left: UTC+11. Image on the right UTC-5 (Daylight saving included)</small></p>
        </div>
        <footer>
          <div>
            <div styleName={'divider'} />
            <p>Made with ❤ by &nbsp;
              <a href="https://github.com/AkiraLaine" target="_blank">Akira Laine</a>, &nbsp;
              <a href="https://github.com/awesomeaniruddh/" target="_blank">Aniruddh Agarwal</a>  and&nbsp;
              <a href="https://github.com/jrogatis/" target="_blank">Jean Philip de Rogatis</a>
            </p>

            <p>
              Check out the repo on <a href="https://github.com/FreeCodeCamp/LetsMeet" target="_blank">GitHub</a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default cssModules(Home, styles);
