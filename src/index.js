import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/Home';
import DetailScreen from './screens/Detail';
import BookScreen from './screens/Book';

import './assets/sass/app.sass';

ReactDOM.render(
	<Router>
		<Switch>
			<Route path='/' component={ HomeScreen } exact />
			<Route path='/book/:slug/:type' component={ DetailScreen } exact />
			<Route path='/book/slot/:slug/:type' component={ BookScreen } exact />
		</Switch>
	</Router>,
	document.getElementById('root')
);
