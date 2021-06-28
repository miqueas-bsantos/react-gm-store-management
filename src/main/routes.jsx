import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Products from '../dash/products/products';
import Category from '../dash/category/category';

export default props => (
  <Switch>
    <Route path="/admin/dashboard/products">
      <Products />
    </Route>
    <Route path="/admin/dashboard/category">
      <Category />
    </Route>
    <Route path="/">
      <Products />
    </Route>
  </Switch>
);
