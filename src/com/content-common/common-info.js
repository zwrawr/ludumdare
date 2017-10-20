import {h, Component} 				from 'preact/preact';

import SVGIcon							from 'com/svg-icon/icon';


export default class ContentCommonInfo extends Component {
	constructor( props ) {
		super(props);
    }

    render( props ) {

        let title = props.title;
        let message = props.message;

        if ( title && message ) {


            return (
                <div class="common-info">
                    <SVGIcon>info</SVGIcon>
                    <h3 class="-normally-hidden">{title}</h3>
                    <span class="-normally-hidden"/>
                    <p class="-normally-hidden">{message}</p>
                </div>
            );
        }
        return;
    }
}
