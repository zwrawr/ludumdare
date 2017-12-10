import {h, Component} 				from 'preact/preact';

export default class Line extends Component {

	constructor( props ) {
		super(props);

		this.state = {
			"points": null,
			"texts": null
		};

    }

    render( props, state ) {

        if ( !(
			props &&
			props.x &&
			props.y &&
			Array.isArray(props.x) &&
			Array.isArray(props.y) &&
			props.sx &&
			props.sy &&
			Array.isArray(props.sx) &&
			Array.isArray(props.sy) &&
			(props.y.length == props.x.length) &&
			(props.sy.length == props.sx.length) &&
			(props.color != null)
		) ) {
            console.warn('Line was created with invalid props', props);
            return;
        }

        let {x, y, sx, sy, color} = props;

        let lineclass = cN("-line", "vis_stroke_color_"+color, props.class);
        let pointclass = cN("-point", "vis_fill_color_"+color, props.class);
        let textclass = cN("-text -hidden", "vis_fill_color_"+color, props.class);

		let points = [];
		let texts = [];

		let line = "";
		for (let i = 0; i < x.length; i++) {

			if (sy[i] && sx[i]){

				if (i == 0) {
					line += "M"+sx[i]+","+sy[i]+" ";
				}
				else {
					line += "L"+sx[i]+","+sy[i]+" ";
				}

				const title = "(" + x[i] + "," + y[i] + ")";
				points.push(<circle cx={sx[i]} cy={sy[i]} class={pointclass} r="1" ></circle>);
				texts.push(<text x={sx[i]} y={sy[i]} class={textclass}>{title}</text>);
			}
		}
		//line += "Z";

		state.points = points;
		state.texts = texts;

        return (
			<g class="-series">
				<path class={lineclass} d={line}/>
				<g class="-points">{points}</g>
				<g class="-texts">{texts}</g>
			</g>
        );
    }
}
