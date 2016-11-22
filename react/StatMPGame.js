import React from 'react';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

const centerStyle = {
	textAlign: 'center'
};

const headerStyle = {
	textAlign: 'center',
	fontSize: '2em'
};

const buttonStyle = {
	marginTop: '20px',
	marginLeft: '10px',
	marginRight: '5px'
};

const e = 2718282;
const eThreshold = 4;

const select10 = [
	{value: 0, text: 'Choose'},
	{value: 1, text: '1'},
	{value: 2, text: '2'},
	{value: 3, text: '3'},
	{value: 4, text: '4'},
	{value: 5, text: '5'},
	{value: 6, text: '6'},
	{value: 7, text: '7'},
	{value: 8, text: '8'},
	{value: 9, text: '9'},
	{value: 10, text: '10'}
];

const select2 = [
	{value: 0, text: 'Choose'},
	{value: 1, text: '1'},
	{value: 2, text: '2'}
];

export default class MidsetCalculator extends React.Component {
	/** @class  */
	constructor(props, context) {
		super(props, context);

		this.state = {
			winnings: 1,
			gameOver: false,

			level: 0,
			eReached: false,
			eLevel: 2,

			select: select10,
			selected: 0,
			compChoice: '',

			loading: false
		};
	}

	_reset = () => {
		this.setState({
			winnings: 1,
			gameOver: false,

			level: 0,
			eReached: false,
			eLevel: 2,

			select: select10,
			selected: 0,
			compChoice: '',

			loading: false
		})
	}

	_generate = n => {
		return Math.floor(n * Math.random()) + 1;
	}

	_finish = async () => {
		this.setState({
			selected: 0,
			loading: false
		});
	}

	_gameOver = async () => {
		await this.setState({
			gameOver: true
		});
	}

	_jackpot = async () => {
		await this.setState({
			winnings: this.state.winnings + e,
			gameOver: true
		});
	}

	_check = async () => {
		await this.setState({
			loading: true
		});

		if (this.state.eReached) {
			let compChoice = this._generate(this.state.eLevel);
			await this.setState({
				compChoice
			});

			if (this.state.selected === compChoice || !this.state.selected) {
				await this._increaseELevel();
			} else if (this.state.eLevel % 2) {
				await this._jackpot();
			} else {
				await this._gameOver();
			}
		} else {
			let compChoice = this._generate(10);
			await this.setState({
				compChoice
			});

			if (this.state.selected === compChoice || !this.state.selected) {
				await this._increaseLevel();
			} else {
				await this._gameOver();
			}
		}

		await this._finish();
	}

	_increaseLevel = async () => {
		if (this.state.level === eThreshold) {
			await this.setState({
				winnings: this.state.winnings + Math.pow(10, this.state.level + 1),
				eReached: true,
				select: select2
			});
		} else {
			await this.setState({
				winnings: this.state.winnings + Math.pow(10, this.state.level + 1),
				level: this.state.level + 1
			});
		}
	}

	_increaseELevel = async () => {
		let nextLevel = this.state.eLevel + 1;
		await this.setState({
			eLevel: nextLevel,
			select: this.state.select.concat({value: nextLevel, text: nextLevel.toString()})
		});
	}

	_onChange = (event, index, value) => {
		this.setState({
			selected: value
		});
	}

	_guideText = () => {
		if (this.state.eReached) {
			return <p style={centerStyle}>{"Choose a number between 1 and " + this.state.eLevel.toString() + ". If you don't match the computer's number, you " + (this.state.eLevel % 2 ? "win" : "lose") + "!"}</p>;
		} else {
			return <p style={centerStyle}>Choose a number between 1 and 10. Match the computer's number to win!</p>;
		}
	}

	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<Paper style={{margin: 20, padding: 20, width: 800, textAlign: 'left'}} zDepth={1}>
					<p style={headerStyle}>Who Wants to be a Mill-e-onaire?</p>

					<Dialog title="Loading..." open={this.state.loading} bodyStyle={centerStyle} titleStyle={centerStyle}>
						<CircularProgress />
					</Dialog>

					<p>{"Winnings: $" + this.state.winnings.toString()}</p>

					{this._guideText()}
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<SelectField
							value={this.state.selected}
							onChange={this._onChange}
							style={{
								margin: 5
							}}>
							
							{this.state.select.map((item, idx) => (
								<MenuItem value={item.value} primaryText={item.text} key={idx} />
							))}
						</SelectField>

						<RaisedButton label="Submit" onClick={this._check} primary={true} disabled={this.state.gameOver} style={buttonStyle} />
					</div>

					<p>{"The computer chose: " + this.state.compChoice}</p>

					{
						this.state.gameOver ? <div>
							<p>{"Game Over. You won $" + this.state.winnings + "!"}</p>
							<RaisedButton label="Play Again" onClick={this._reset} secondary={true} />
						</div> : null
					}
				</Paper>
			</div>
		)
	}
}