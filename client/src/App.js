import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './index.css'
import AddPirates from './pages/AddPirates/AddPirates';
import Auth from './pages/auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Pirate from './pages/Pirate/Pirate';
import UserRoute from './routes/UserRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar />
          <div style={{ marginTop: '100px' }}>
            <Switch>
              <Route exact path='/' component={Auth} />
              <UserRoute exact path='/dashboard' component={Dashboard} />
              <UserRoute exact path='/pirate/new' component={AddPirates} />
              <UserRoute exact path='/pirate/:id' component={Pirate} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App;