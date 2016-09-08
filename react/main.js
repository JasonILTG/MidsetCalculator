import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider, connect } from 'react-redux';
import { Route, Router, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Get the Material UI theme.
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(baseTheme);

import store from '../redux/store.js';

import Home from './Home.js';
import MidsetCalculator from './MidsetCalculator';

class App extends React.Component {
	// This is needed for MUI.
	static childContextTypes = {
		muiTheme: React.PropTypes.object.isRequired
	};

	getChildContext() {
		// This is needed for MUI.
		return { muiTheme };
	}

	constructor(props, context) {
		super(props, context);

		// This is needed for MUI.
		injectTapEventPlugin();
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

let syncedHistory = syncHistoryWithStore(browserHistory, store);

const routes = (
	<Provider store={store}>
		<Router history={syncedHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />

				<Route path="midset" component={MidsetCalculator} />
			</Route>
		</Router>
	</Provider>
);

// Render the app.
ReactDOM.render(routes, document.getElementById('app'));