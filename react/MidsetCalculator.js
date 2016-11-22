import React from 'react';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const hash = 13.5;
const sideline = 41.5
const items = {
	xStep: [
		{value: 0, text: '0'},
		{value: 1, text: '1'},
		{value: 2, text: '2'},
		{value: 3, text: '3'},
		{value: 4, text: '4'}
	],
	xFrac: [
		{value: 0, text: '.0'},
		{value: 0.25, text: '.25'},
		{value: 0.5, text: '.5'},
		{value: 0.75, text: '.75'}
	],
	out: [
		{value: true, text: 'outside'},
		{value: false, text: 'inside'}
	],
	line: [
		{value: 50, text: '50'},
		{value: 45, text: '45'},
		{value: 40, text: '40'},
		{value: 35, text: '35'},
		{value: 30, text: '30'},
		{value: 25, text: '25'},
		{value: 20, text: '20'},
		{value: 15, text: '15'},
		{value: 10, text: '10'},
		{value: 5, text: '5'},
		{value: 0, text: '0'}
	],
	side: [
		{value: 1, text: '1'},
		{value: 2, text: '2'}
	],

	yStep: [
		{value: 0, text: '0'},
		{value: 1, text: '1'},
		{value: 2, text: '2'},
		{value: 3, text: '3'},
		{value: 4, text: '4'},
		{value: 5, text: '5'},
		{value: 6, text: '6'},
		{value: 7, text: '7'},
		{value: 8, text: '8'},
		{value: 9, text: '9'},
		{value: 10, text: '10'},
		{value: 11, text: '11'},
		{value: 12, text: '12'},
		{value: 13, text: '13'},
		{value: 14, text: '14'},
	],
	yFrac: [
		{value: 0, text: '.0'},
		{value: 0.25, text: '.25'},
		{value: 0.5, text: '.5'},
		{value: 0.75, text: '.75'}
	],
	front: [
		{value: true, text: 'in front of'},
		{value: false, text: 'behind'}
	],
	mark: [
		{value: sideline, text: 'Front Side Line'},
		{value: hash, text: 'Front Hash'},
		{value: -hash, text: 'Back Hash'},
		{value: -sideline, text: 'Back Side Line'}
	]
};

const width = {
	xStep: 40,
	xFrac: 40,
	in: 80,
	line: 40,
	side: 40,
	yStep: 40,
	yFrac: 40,
	front: 120,
	hash: 160
}

const pStyle = {
	margin: 5,
	height: 33,
	display: 'flex',
	alignItems: 'flex-end'
}

const spanStyle = {
	verticalAlign: 'bottom'
}

export default class MidsetCalculator extends React.Component {
	/** @class  */
	constructor(props, context) {
		super(props, context);

		this.state = {
			xStep1: 0,
			xFrac1: 0,
			out1: true,
			line1: 50,
			side1: 1,

			yStep1: 0,
			yFrac1: 0,
			front1: true,
			mark1: hash,

			xStep2: 0,
			xFrac2: 0,
			out2: true,
			line2: 50,
			side2: 1,

			yStep2: 0,
			yFrac2: 0,
			front2: true,
			mark2: hash,

			submitted: false,
			num: 1,
			xAnswer: '',
			yAnswer: ''
		};
	}

	_calculate = () => {
		let x1 = (this.state.side1 % 2 ? -1 : 1) * (((50 - this.state.line1) * 8 / 5) + (this.state.out1 ? 1 : -1) * (this.state.xStep1 + this.state.xFrac1));
		let x2 = (this.state.side2 % 2 ? -1 : 1) * (((50 - this.state.line2) * 8 / 5) + (this.state.out2 ? 1 : -1) * (this.state.xStep2 + this.state.xFrac2));
		let xMid = (x1 + x2) * 0.5;

		let side = xMid > 0 ? 2 : 1;
		xMid = Math.abs(xMid);
		let line = 50 - (Math.round(xMid / 8) * 5);
		xMid -= Math.round(xMid / 8) * 8;
		let out = xMid >= 0 ? 'outside' : 'inside';
		xMid = Math.abs(xMid);
		let xAnswer = xMid.toString() + ' steps ' + out + ' the ' + line.toString() + ' yd line on Side ' + side.toString();

		let y1 = this.state.mark1 + (this.state.front1 ? 1 : -1) * (this.state.yStep1 + this.state.yFrac1);
		let y2 = this.state.mark2 + (this.state.front2 ? 1 : -1) * (this.state.yStep2 + this.state.yFrac2);
		let yMid = (y1 + y2) * 0.5;

		let mark;
		let markStr;
		if (yMid >= (hash + sideline) * 0.5) {
			mark = sideline;
			markStr = 'Front Side Line';
		} else if (yMid >= 0) {
			mark = hash
			markStr = 'Front Hash';
		} else if (yMid >= (hash + sideline) * -0.5) {
			mark = -hash;
			markStr = 'Back Hash';
		} else {
			mark = -sideline;
			markStr = 'Back Side Line';
		}
		yMid -= mark;
		let front = yMid >= 0 ? 'in front of' : 'behind';
		yMid = Math.abs(yMid);

		let yAnswer = yMid.toString() + ' steps ' + front + ' the ' + markStr;

		this.setState({
			submitted: true,
			xAnswer,
			yAnswer
		})
	}

	_selectFieldGenerate = varName => (
		<SelectField
			value={this.state[varName]}
			onChange={this._onChange(varName)}
			style={{
				width: width[varName.substring(0, varName.length - 1)],
				margin: 5
			}}>
			{items[varName.substring(0, varName.length - 1)].map((item, idx) => (
				<MenuItem value={item.value} primaryText={item.text} key={idx} />
			))}
		</SelectField>
	)

	_onChange = varName => (event, index, value) => {
		this.setState({
			[varName]: value
		});
	}

	_getOrdinal = num => (num == 1 ? '1st' : (num == 2 ? '2nd' : (num == 3 ? '3rd' : num.toString() + 'th')))

	_nextSet = event => {
		this.setState({
			xStep1: this.state.xStep2,
			xFrac1: this.state.xFrac2,
			out1: this.state.out2,
			line1: this.state.line2,
			side1: this.state.side2,

			yStep1: this.state.yStep2,
			yFrac1: this.state.yFrac2,
			front1: this.state.front2,
			mark1: this.state.mark2,

			xStep2: 0,
			xFrac2: 0,
			out2: true,
			line2: 50,
			side2: 1,

			yStep2: 0,
			yFrac2: 0,
			front2: true,
			mark2: hash,

			submitted: false,
			num: this.state.num + 1,
			xAnswer: '',
			yAnswer: ''
		})
	}

	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
				<Paper style={{padding: 20, margin: 10, width: 600}}>
					<p style={{fontSize: '2em'}}>Midset Calculator</p>

					<b>{'Your ' + this._getOrdinal(this.state.num) + ' set is:'}</b>
					<div style={{display: 'flex'}}>
						{this._selectFieldGenerate('xStep1')}
						{this._selectFieldGenerate('xFrac1')}
						<p style={pStyle}><span>steps</span></p>
						{this._selectFieldGenerate('out1')}
						<p style={pStyle}><span>the</span></p>
						{this._selectFieldGenerate('line1')}
						<p style={pStyle}><span>yd line on Side</span></p>
						{this._selectFieldGenerate('side1')}
					</div>

					<div style={{display: 'flex'}}>
						{this._selectFieldGenerate('yStep1')}
						{this._selectFieldGenerate('yFrac1')}
						<p style={pStyle}><span>steps</span></p>
						{this._selectFieldGenerate('front1')}
						<p style={pStyle}><span>the</span></p>
						{this._selectFieldGenerate('mark1')}
					</div>

					<b>{'Your ' + this._getOrdinal(this.state.num + 1) + ' set is:'}</b>
					<div style={{display: 'flex'}}>
						{this._selectFieldGenerate('xStep2')}
						{this._selectFieldGenerate('xFrac2')}
						<p style={pStyle}><span>steps</span></p>
						{this._selectFieldGenerate('out2')}
						<p style={pStyle}><span>the</span></p>
						{this._selectFieldGenerate('line2')}
						<p style={pStyle}><span>yd line on Side</span></p>
						{this._selectFieldGenerate('side2')}
					</div>
					<div style={{display: 'flex'}}>
						{this._selectFieldGenerate('yStep2')}
						{this._selectFieldGenerate('yFrac2')}
						<p style={pStyle}><span>steps</span></p>
						{this._selectFieldGenerate('front2')}
						<p style={pStyle}><span>the</span></p>
						{this._selectFieldGenerate('mark2')}
					</div>

					<div style={{display: 'flex', textAlign: 'left', margin: 20}}>
						<RaisedButton label="Calculate" onClick={this._calculate} primary={true} />
						<div style={{flexGrow: 1}} />
						{
							this.state.submitted ? (
								<RaisedButton label="Next Set" onClick={this._nextSet} primary={true} />
							) : null
						}
					</div>

					{
						this.state.submitted ? (
							<div>
								<b>Your midset is:</b>
								<p>{this.state.xAnswer}</p>
								<p>{this.state.yAnswer}</p>
							</div>
						) : null
					}
				</Paper>
			</div>
		)
	}
}