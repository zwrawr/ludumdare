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

	parseGamesForRatings(games) {

		let values = [
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []}
		];

		games.forEach(game => {

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

		return {"values": values, "lables": ["ratings recived", "feedback given", "ratings given"]};
	}

	parseGamesForGrading(games) {

		let values = [
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []}
		];

		games.forEach(game => {

			if (game && game.magic){
				const event = game.parent;

				const grade1 = game.magic["grade-01-average"];
                const grade2 = game.magic["grade-02-average"];
                const grade3 = game.magic["grade-03-average"];
                const grade4 = game.magic["grade-04-average"];
                const grade5 = game.magic["grade-05-average"];
                const grade6 = game.magic["grade-06-average"];
                const grade7 = game.magic["grade-07-average"];
                const grade8 = game.magic["grade-08-average"];

				values[0].x.push(event);
				values[0].y.push(grade1);

				values[1].x.push(event);
				values[1].y.push(grade2);

				values[2].x.push(event);
				values[2].y.push(grade3);

				values[3].x.push(event);
				values[3].y.push(grade4);

				values[4].x.push(event);
				values[4].y.push(grade5);

				values[5].x.push(event);
				values[5].y.push(grade6);

				values[6].x.push(event);
				values[6].y.push(grade7);

				values[7].x.push(event);
				values[7].y.push(grade8);

			}
		});

		return {
			"values": values,
			"lables": [
				"grade-01",
				"grade-02",
				"grade-03",
				"grade-04",
				"grade-05",
				"grade-06",
				"grade-07",
				"grade-08"
			]
		};
	}

	parseGamesForGradingCurrent(games, id) {

		let values = [];

		games.forEach(game => {

			if (game && game.magic && game.parent == id){
				const event = game.parent;

				values.push(game.magic["grade-01-average"]);
				values.push(game.magic["grade-02-average"]);
				values.push(game.magic["grade-03-average"]);
				values.push(game.magic["grade-04-average"]);
				values.push(game.magic["grade-05-average"]);
				values.push(game.magic["grade-06-average"]);
				values.push(game.magic["grade-07-average"]);
				values.push(game.magic["grade-08-average"]);

			}
		});

		return {
			"values": values,
			"lables": [
				"grade-01",
				"grade-02",
				"grade-03",
				"grade-04",
				"grade-05",
				"grade-06",
				"grade-07",
				"grade-08"
			]
		};
	}



	parseGamesForRankingCurrent(games, id) {

		let values = [];

		games.forEach(game => {

			if (game && game.magic && game.parent == id){
				const event = game.parent;

				values.push(game.magic["grade-01-result"]);
				values.push(game.magic["grade-02-result"]);
				values.push(game.magic["grade-03-result"]);
				values.push(game.magic["grade-04-result"]);
				values.push(game.magic["grade-05-result"]);
				values.push(game.magic["grade-06-result"]);
				values.push(game.magic["grade-07-result"]);
				values.push(game.magic["grade-08-result"]);

			}
		});

		return {
			"values": values,
			"lables": [
				"grade-01",
				"grade-02",
				"grade-03",
				"grade-04",
				"grade-05",
				"grade-06",
				"grade-07",
				"grade-08"
			]
		};
	}

	parseGamesForRanking(games) {

		let values = [
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []},
			{"x": [],"y": []}
		];

		games.forEach(game => {

			if (game && game.magic){
				const event = game.parent;

				const grade1 = game.magic["grade-01-result"];
				const grade2 = game.magic["grade-02-result"];
				const grade3 = game.magic["grade-03-result"];
				const grade4 = game.magic["grade-04-result"];
				const grade5 = game.magic["grade-05-result"];
				const grade6 = game.magic["grade-06-result"];
				const grade7 = game.magic["grade-07-result"];
				const grade8 = game.magic["grade-08-result"];

				values[0].x.push(event);
				values[0].y.push(grade1);

				values[1].x.push(event);
				values[1].y.push(grade2);

				values[2].x.push(event);
				values[2].y.push(grade3);

				values[3].x.push(event);
				values[3].y.push(grade4);

				values[4].x.push(event);
				values[4].y.push(grade5);

				values[5].x.push(event);
				values[5].y.push(grade6);

				values[6].x.push(event);
				values[6].y.push(grade7);

				values[7].x.push(event);
				values[7].y.push(grade8);

			}
		});

		return {
			"values": values,
			"lables": [
				"grade-01",
				"grade-02",
				"grade-03",
				"grade-04",
				"grade-05",
				"grade-06",
				"grade-07",
				"grade-08"
			]
		};
	}


	parseGamesForTypes(games) {

		let labels = [];
		let values = [];

		games.forEach(game => {

			if (game && game.subtype == "game" && game.subsubtype){

				const type = game.subsubtype;

				if (labels.includes(type)){
					values[labels.indexOf(type)]++;
				}
				else {
					labels.push(type);
					values.push(1);
				}
			}
		});

		return {"values": values, "lables": labels};
	}

	parseGamesForAuthors(games) {

		let labels = [];
		let values = [];

		games.forEach(game => {

			if (game && game.meta.author){

				const num = game.meta.author.length;

				if (labels.includes(num)){
					values[labels.indexOf(num)]++;
				}
				else {
					labels.push(num);
					values.push(1);
				}
			}
		});

		return {"values": values, "lables": labels};
	}



	render( props, state ) {

		console.log(props);

		var Class = [];
		Class.push("content-stats");
		Class.push("content-stats-user");

		if ( props.user ) {

			var Data = [];

			if (state && state.games) {


				// types pie
				let Types = [];

				Types.push(<div class="-gap"><span class="-title">Game types</span></div>);
				let types = this.parseGamesForTypes(state.games);
				Types.push(<PieChart values={types.values} labels={types.lables} use_percentages={true}></PieChart>);

				Data.push(<div class="section -types">{Types}</div>);



				// authors pie
				let Authors = [];

				Authors.push(<div class="-gap"><span class="-title">Number of Authors</span></div>);
				let authors = this.parseGamesForAuthors(state.games);
				Authors.push(<PieChart values={authors.values} labels={authors.lables} use_percentages={true}></PieChart>);

				Data.push(<div class="section -authors">{Authors}</div>);


				// current grading chart
				let CG = [];

				CG.push(<div class="-gap"><span class="-title">Current Grading</span></div>);
				let cg = this.parseGamesForGradingCurrent(state.games, props.featured.id);
				CG.push(<BarChart values={cg.values} labels={cg.lables}></BarChart>);

				Data.push(<div class="section -cg">{CG}</div>);



				// current rankings chart
				let CR = [];

				CR.push(<div class="-gap"><span class="-title">Current Ranking</span></div>);
				let cr = this.parseGamesForRankingCurrent(state.games, props.featured.id);
				CR.push(<BarChart values={cr.values} labels={cr.lables}></BarChart>);

				Data.push(<div class="section -cr">{CR}</div>);


				// grading graph
				let Grading = [];

				Grading.push(<div class="-gap"><span class="-title">Game Grading</span></div>);
				let grading = this.parseGamesForGrading(state.games);
				Grading.push(<Graph values={grading.values} labels={grading.lables} use_percentages={true}></Graph>);

				Data.push(<div class="section -grading">{Grading}</div>);



				// ranking graph
				let Ranking = [];

				Ranking.push(<div class="-gap"><span class="-title">Game rankings</span></div>);
				let ranking = this.parseGamesForRanking(state.games);
				Ranking.push(<Graph values={ranking.values} labels={ranking.lables} use_percentages={true}></Graph>);

				Data.push(<div class="section -ranking">{Ranking}</div>);


				// Submissions graph
				let Ratings = [];

				Ratings.push(<div class="-gap"><span class="-title">Number of Ratings</span></div>);
				let ratings = this.parseGamesForRatings(state.games);
				Ratings.push(<Graph values={ratings.values} labels={ratings.lables} use_percentages={true}></Graph>);

				Data.push(<div class="section -ratings">{Ratings}</div>);

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
