import {h, Component} 				from 'preact/preact';

import NavLink							from 'com/nav-link/link';

import ContentLoading					from 'com/content-loading/loading';
import ContentError						from 'com/content-error/error';

import ContentCommon					from 'com/content-common/common';

import ContentCommonBody				from 'com/content-common/common-body';
import ContentCommonBodyTitle			from 'com/content-common/common-body-title';

import PieChart							from 'com/visualization/piechart/piechart';
import BarChart							from 'com/visualization/barchart/barchart';
import Graph							from 'com/visualization/graph/graph';


import $Node							from '../../shrub/js/node/node';


export default class ContentStatsUser extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'games': null
		};
	}

	componentDidMount() {
		//var props = this.props;
		var state = this.state;

		this.getGames();
	}


	getGames() {
		var props = this.props;

		$Node.Get(props.user.private.refs.author)
		.then(r => {
			if ( r.node ) {
				this.setState({'games': r.node});
			}
		});
	}

	parseGames(games) {

		let values = [
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []}
		];

		games.forEach(game => {
			console.log(game);
			console.log(game.id,game.slug);
			if (game && game.magic){
				const event = game.parent;
				const grade = game.magic.grade;
				const feedback = game.magic.feedback;
				const given = game.magic.given;

				values[0].x.push(event);
				values[0].y.push(grade);

				values[1].x.push(event);
				values[1].y.push(feedback);

				values[2].x.push(event);
				values[2].y.push(given);
			}
		});

		return {"values": values, "lables": ["grade", "feedback", "given"]};
	}

	render( props, state ) {

		var Class = [];
		Class.push("content-stats");
		Class.push("content-stats-user");

		if ( props.user ) {

			var Data = [];

			if (state && state.games) {
				// Submissions graph
				let submissions = [];

				submissions.push(<div class="-gap"><span class="-title">Number of Submissions</span></div>);

				let parsed = this.parseGames(state.games);
				console.log(parsed);
				submissions.push(<Graph values={parsed.values} labels={parsed.lables} use_percentages={true}></Graph>);


				Data.push(<div class="section -submissions">{submissions}</div>);
			}


			Data.push(<span>authored : {props.user.private.refs.author.join(", ")} </span>);

			//-
			return (
				<ContentCommon {...props} class={cN(Class)}>
					<ContentCommonBodyTitle title="Statistics" />
					<ContentCommonBody>
						{Data}
					</ContentCommonBody>
				</ContentCommon>
			);

		}
		else {
			return <ContentLoading />;
		}
	}
}
