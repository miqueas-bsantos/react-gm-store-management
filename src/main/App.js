import React from 'react';
import './style.css';
import RoutesAdmin from './routes';
import Dashboard from '../dash/dash';

export default function App() {
  return (
    <Router>
      <Route path="/admin/dashboard">
        <Dashboard>
          <RoutesAdmin />
        </Dashboard>
      </Route>
    </Router>
  );
}
