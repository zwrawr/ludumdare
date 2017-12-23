import {h, Component} 				from 'preact/preact';

const BAR_WIDTH_GAP_RATIO = 0.8;

export default class Bar extends Component {
	constructor( props ) {
		super(props);
<<<<<<< HEAD
	}

	// NOTE: This emits SVG, not HTML
	render( props ) {
		let {valuePos, zero} = props;
		const {width, color, left} = props;
		// it's valid for valuePos/width to be zero so we have to check it against undefined.
		if ( !((valuePos != null) && (width != null) && (left != null) && color) ) {
			console.warn("Bar was created with invalid props", this.props);
			return;
		}

		if ( valuePos < zero ) {
			let tmp = zero;
			zero = valuePos;
			valuePos = tmp;
		}
		let segmentclass = cN("-bar", "vis_fill_color_"+color, this.props.class);

		return (
			<rect class={segmentclass} x={left} y={zero} width={width * BAR_WIDTH_GAP_RATIO} height={valuePos - zero}/>
		);
	}
=======

    }

    render( props ) {

        // it's valid for height/width/index to be zero so we have to check it against undefined.
        if ( !(props && (props.height != null) && (props.index != null) && (props.width != null) && props.color) ) {
            console.warn('Bar was created with invalid props', props);
            return;
        }

        let {height, width, index, color} = props;

		const width_gap_ratio = 0.8;

        // drawing a bar of 0 height causes artifacting so bail out. Also stops us drawing a bar that is NaN or Null
        if ( !(height > 0) ) {
            return;
        }

        let segmentclass = cN("-bar", "vis_fill_color_"+color, props.class);

        return (
            <rect class={segmentclass} x={width * index} y={0} width={width * width_gap_ratio} height={height}/>
        );
    }
>>>>>>> Cleaner shorter code, Now correct users stats
}
