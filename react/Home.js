import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

@connect(null, dispatch => ({
	pushToMidset: () => {
		dispatch(push('/midset'));
	}
}))
export default class Home extends React.Component {
	componentWillMount() {
		this.props.pushToMidset();
	}

	render() {
		return (
			<a href="/midset">Midset Calculator</a>
		);
	}
}