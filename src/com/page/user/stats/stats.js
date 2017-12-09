import {h, Component}					from 'preact/preact';

import ContentStatsUser from 'com/content-user/user-stats';

export default class UserStats extends Component {
	constructor( props ) {
		super(props);
	}

	render( props, state ) {
        let {node, user, featured, path, extra} = props;

        return (
            <ContentStatsUser node={node} user={user} path={path} extra={extra} featured={featured} />
        );
    }
}
