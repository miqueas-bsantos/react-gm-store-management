import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Products from '../dash/products/products'

export default props => (
    <Switch>
        <Route path="/admin/dashboard/products">
            <Products />
        </Route>
        <Route path="/">
            <Products />
        </Route>
    </Switch>
)