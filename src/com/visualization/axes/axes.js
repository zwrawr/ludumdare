import {h, Component} 				from 'preact/preact';


export default class Axes extends Component {



	createTicks(
		length,
		width = 5,
		tick = 10,
		isVertical = true,
		pad = 10,
		axisWidth = 1
	) {

		if (length <= 0 ) {
			console.warn("Attempting to make an axis with out specifing a length");
		}


		/*
		* 1,9
		* Every 10th pixel is drawn
		*
		* 10,90
		* 90 blank pixels 10 drawn pixels
		*/
		let fill = 1; // TODO: should be able to set this value
		let space = tick - fill;
		let s_da = fill + "," + space;

		let offset = pad + (0.5 * axisWidth);

		let d = (isVertical) ?
		"M" + pad + " " + (pad - (0.5 * axisWidth)) + " l0 " + (length - (2 * pad) + fill) :
		"M" + (pad - (0.5 * axisWidth)) + " " + pad + " l" + (length + fill - (2 * pad)) + " 0";

		return <path class="-axis -tick" stroke-width={width} stroke-dasharray={s_da} d={d} />;

	}

	render({
		height,
		width,
		showX = true,
		showY = true,
		tickXMajor = 100,
		tickYMajor = 100,
		tickXMinor = 20,
		tickYMinor = 20,
		axesWidth = 1,
		padX = 10,
		padY = 10,
		range = {"min": {"x": 0, "y": 0}, "max": {"x": 100, "y": 100}}
	} = {}) {

		if (height <= 0 || width <= 0) {
			console.warn("Attempted to create an axes without specifing a width/height");
			return null;
		}

		let Axes = [];

		if (showX == true) {
			Axes.push(<path class="-axis -axis-main" stroke-width={axesWidth} d={"M" + padX +" " + padY + " l" + (width - (2 * padX)) +" 0"} />);
		}

		if (showY == true) {
			Axes.push(<path class="-axis -axis-main" stroke-width={axesWidth} d={"M" + padX + " " + padY + " l0 " + (height - (2 * padY)) + ""} />);
		}

		if (tickXMajor > 0) {
			Axes.push(this.createTicks(width, axesWidth*4, tickXMajor, false));
		}

		if (tickYMajor > 0) {
			Axes.push(this.createTicks(height, axesWidth*4, tickYMajor, true));
		}

		if (tickXMinor > 0) {
			Axes.push(this.createTicks(width, axesWidth*2, tickXMinor, false));
		}

		if (tickYMinor > 0) {
			Axes.push(this.createTicks(height, axesWidth*2, tickYMinor, true));
		}


		console.log(Axes);
		return (
			<g stroke="black" fill="none" class="-axes">
				{Axes}
			</g>
		);

	}
}
