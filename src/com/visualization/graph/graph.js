import {h, Component} 				from 'preact/preact';

import Line							from 'com/visualization/graph/line';
import Legend						from 'com/visualization/legend/legend';

export default class Graph extends Component {

	constructor( props ) {
		super(props);

    }


	findLimits(values) {
		let max_x = values[0].x[0];
		let max_y = values[0].y[0];
		let min_x = values[0].x[0];
		let min_y = values[0].y[0];

		for (let i = 0; i < values.length; i++) {
			const series = values[i];
			for (let j = 0; j < series.x.length; j++) {
				const element_x = series.x[j];
				if (element_x > max_x) {
					max_x = element_x;
				}
				if (element_x < min_x) {
					min_x = element_x;
				}

				const element_y = series.y[j];
				if (element_y > max_y) {
					max_y = element_y;
				}
				if (element_y < min_y) {
					min_y = element_y;
				}
			}
		}

		console.log({"min": { "x": min_x, "y": min_y}, "max": { "x": max_x, "y": max_y}});


		return {"min": { "x": min_x, "y": min_y}, "max": { "x": max_x, "y": max_y}};
	}

    scaleValues( values, range ) {

		let s_values = [];
		for (let i = 0; i < values.length; i++) {
			const series = values[i];

			let s_series_x = [];
			let s_series_y = [];
			for (let j = 0; j < series.x.length; j++) {
				let x = (series.x[j] - range.min.x)/(range.max.x - range.min.x);
				let y = (series.y[j] - range.min.y)/(range.max.y - range.min.y);

				s_series_x.push(10+80*x);
				s_series_y.push(10+80*y);
			}

			s_values.push({"x": s_series_x, "y": s_series_y});
		}

		return s_values;
    }


    render( props ) {

        if ( !(props && props.labels && props.values && Array.isArray(props.values)) && props.values[0].x && props.values[0].y) {
            console.warn('Graph was created with invalid props', props);
            return <div>No Data!</div>;
        }

		props["use_percentages"] = (props.use_percentages && props.use_percentages == true)? true : false;

        let {labels, values, use_percentages} = props;

		let range = this.findLimits(values);
		let svalues = this.scaleValues(values, range);

		let Lines = [];
		let Names = [];
		let Colors = [];

		for (let i = 0; i < values.length; i++) {
			Colors.push(1 + ( i % 6 ));
			Names.push(labels[i]);
			Lines.push(<Line x={values[i].x} y={values[i].y} sx={svalues[i].x} sy={svalues[i].y} color={Colors[i]}/>);
		}

        return (
            <div class="chart">
                <div class="-graph">
                    <svg class="-svg" viewBox="0 0 100 100" width="100%" height="100%">
						<g transform="translate(0,100) scale(1,-1)">
							{Lines}
						</g>
                    </svg>
                </div>
				<Legend names={Names} colors={Colors}/>
            </div>
        );
    }
}
