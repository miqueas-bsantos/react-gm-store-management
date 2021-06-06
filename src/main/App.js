import React from 'react';
import './style.css';
import RoutesAdmin from './routes';
import Dashboard from '../dash/dash';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Router>
      <Dashboard>
        <RoutesAdmin />
      </Dashboard>
    </Router>
  );
}
