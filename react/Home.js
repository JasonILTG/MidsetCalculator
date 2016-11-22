import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

@connect(null, dispatch => ({
	pushToMidset: () => {
		dispatch(push('/midset'));
	}
}))
export default class Home extends React.Component {
	render() {
		return (
			<div>
				<a href="/midset">Midset Calculator</a>
				<a href="/e">Stat MP Game</a>
			</div>
		);
	}
}