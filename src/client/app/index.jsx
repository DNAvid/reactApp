import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Auth0Lock } from 'auth0-lock';


// Initializing our Auth0Lock
var lock = new Auth0Lock(
  'DKYRjMDoaLlPwmdDcGWGshIHFuwXwtMZ',
    'dnavid.auth0.com'
    );

class App extends React.Component {

        render () {

                return(
                
                <Router> 
                 <div>
                   <Link to='/Profile'>Profile</Link>
                   <Link to='/Search' styles={{marginLeft:'15 px'}}>Search</Link>
                   <Route path='/Profile' render={() => (<div>Profile</div>) }/>
                   <Route path='/Search' render={() => (<div>Search</div>) }/>
                        <button>Login</button>
                        <button>Logout</button>
                 </div>
                </Router>
                
                )
        }
}

render(<App/>, document.getElementById('app'));
