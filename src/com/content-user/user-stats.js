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
import $Grade							from '../../shrub/js/grade/grade';


export default class ContentStatsUser extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'games': null,
			'grades': null,
			'events': null
		};
	}

	componentDidMount() {
		//var props = this.props;
		var state = this.state;

		this.getGames();
		this.getMyGrades();
		this.getEvents();
	}


	getCategories(featured) {

		//TODO:: read these from the featured meta
		const ids = [
			"grade-01",
			"grade-02",
			"grade-03",
			"grade-04",
			"grade-05",
			"grade-06",
			"grade-07",
			"grade-08"
		];

		const lables = ids.map( id => featured.meta[id]);

		return {"ids":ids,"lables":lables};
	}

	getGames() {
		var props = this.props;

		$Node.GetFeed(props.node.id, 'author', ['item'], ['game'])
		.then(r => {
			if (r.feed) {

				//Parse IDs
				let games = [];
				r.feed.forEach(g => {
					games.push(g.id);
				});

				//Get nodes
				$Node.Get(games)
				.then(r => {
					if ( r.node ) {
						this.setState({'games': r.node});
					}
				});
			}
		});


	}

	getMyGrades() {
		var props = this.props;

		// only try to get grades if were looking at our own stats
		if (props.node.id != props.user.id) {
			return;
		}

		$Grade.GetAllMy(props.featured.id)
		.then(r => {
			if ( r.grade ) {
				this.setState({'grades': r.grade});
			}
		});
	}

	getEvents() {
		$Node.GetFeed(9, 'parent', ['event'])
		.then(r => {
			if (r.feed) {

				//Parse IDs
				let events = [];
				r.feed.forEach(e => {
					events.push(e.id);
				});

				//Get nodes
				$Node.Get(events)
				.then( r => {
					if ( r.node ) {
						this.setState({'events': r.node});
					}
				});
			}
		});
	}

	parseGamesForRatings(games) {

		// Build array for graph
		let values = [];
		for (let i = 0; i < 3; i++) {
			values.push({"x": [],"y": []});
		}

		games.forEach(game => {
			if (game && game.magic){

				values[0].x.push(game.parent);
				values[0].y.push(game.magic.grade);

				values[1].x.push(game.parent);
				values[1].y.push(game.magic.feedback);

				values[2].x.push(game.parent);
				values[2].y.push(game.magic.given);
			}
		});

		return {"values": values, "lables": ["ratings recived", "feedback given", "ratings given"]};
	}

	parseGamesForGrading(games, featured) {

		const categories = this.getCategories(featured);

		// Build array for graph
		let values = [];
		for (let i = 0; i < categories.ids.length; i++) {
			values.push({"x": [],"y": []});
		}

		games.forEach(game => {

			if (game && game.magic){
				for (let i = 0; i < categories.ids.length; i++) {
					values[i].x.push(game.parent);
					values[i].y.push(game.magic[categories.ids[i]+"-average"]);
				}
			}
		});

		return {
			"values": values,
			"lables": categories.lables
		};
	}

	parseGamesForGradingCurrent(games, featured) {

		const categories = this.getCategories(featured);

		let values = [];

		games.forEach(game => {
			if (game && game.magic && game.parent == featured.id){
				for (let i = 0; i < categories.ids.length; i++) {
					values.push(game.magic[categories.ids[i]+"-average"]);
				}
			}
		});

		return {
			"values": values,
			"lables": categories.lables
		};
	}



	parseGamesForRankingCurrent(games, featured) {

		const categories = this.getCategories(featured);

		let values = [];

		games.forEach(game => {
			if (game && game.magic && game.parent == featured.id){
				for (let i = 0; i < categories.ids.length; i++) {
					values.push(game.magic[categories.ids[i]+"-result"]);
				}
			}
		});

		return {
			"values": values,
			"lables": categories.lables
		};
	}

	parseGamesForRanking(games, featured) {

		const categories = this.getCategories(featured);

		// Build array for graph
		let values = [];
		for (let i = 0; i < categories.ids.length; i++) {
			values.push({"x": [],"y": []});
		}

		games.forEach(game => {
			if (game && game.magic){
				for (let i = 0; i < categories.ids.length; i++) {
					values[i].x.push(game.parent);
					values[i].y.push(game.magic[categories.ids[i]+"-result"]);
				}
			}
		});

		return {
			"values": values,
			"lables": categories.lables
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


	parseMyGradesForDist(grades, featured) {

		const categories = this.getCategories(featured);

		// Build array for graph
		let values = [];
		for (let i = 0; i < categories.ids.length; i++) {
			values.push({"x": Array.from(Array(11)).map((e,i)=>i/2),"y": new Array(11).fill(0)});
		}

		// populate array
		Object.keys(grades).forEach(key => {
			if (grades[key]){
				categories.ids.forEach(c => {
					if (grades[key][c]){
						values[categories.ids.indexOf(c)].y[grades[key][c]*2]++;
					}
				});
			}
		});

		return {
			"values": values,
			"lables": categories.lables
		};
	}


	parseMyGradesForAvgDist(grades) {

		// build array for graph
		const lables = Array.from(Array(11)).map((e,i)=>i/2);
		let values = new Array(11).fill(0);

		// populate array
		Object.keys(grades).forEach(key => {
			if (grades[key]){
				Object.keys(grades[key]).forEach(g => {
					values[grades[key][g]*2]++;
				});
			}
		});

		return {
			"values": values,
			"lables": lables
		};
	}


	render( props, state ) {

		console.log("props", props);
		console.log("state", state);

		var Class = [];
		Class.push("content-stats");
		Class.push("content-stats-user");

		if ( props.user ) {

			var Data = [];

			if (state) {

				// Stats on my games
				if (state.games) {


					Data.push(<ContentCommonBodyTitle title="Your Games From All Events"/>);


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


					// ratings graph
					let Ratings = [];

					Ratings.push(<div class="-gap"><span class="-title">Number of Ratings</span></div>);
					let ratings = this.parseGamesForRatings(state.games, props.featured);
					Ratings.push(<Graph values={ratings.values} labels={ratings.lables} use_percentages={true}></Graph>);

					Data.push(<div class="section -ratings">{Ratings}</div>);


					if (props.featured.meta['event-finished'] == 1) {

						Data.push(<ContentCommonBodyTitle title="Your Games Results From This Event"/>);

						// current grading chart
						let CG = [];

						CG.push(<div class="-gap"><span class="-title">Current Grading</span></div>);
						let cg = this.parseGamesForGradingCurrent(state.games, props.featured);
						CG.push(<BarChart values={cg.values} labels={cg.lables}></BarChart>);

						Data.push(<div class="section -cg">{CG}</div>);



						// current rankings chart
						let CR = [];

						CR.push(<div class="-gap"><span class="-title">Current Ranking</span></div>);
						let cr = this.parseGamesForRankingCurrent(state.games, props.featured);
						CR.push(<BarChart values={cr.values} labels={cr.lables}></BarChart>);

						Data.push(<div class="section -cr">{CR}</div>);


					}

					Data.push(<ContentCommonBodyTitle title="Your Games Results"/>);

					// grading graph
					let Grading = [];

					Grading.push(<div class="-gap"><span class="-title">Game Grading</span></div>);
					let grading = this.parseGamesForGrading(state.games, props.featured);
					Grading.push(<Graph values={grading.values} labels={grading.lables} use_percentages={true}></Graph>);

					Data.push(<div class="section -grading">{Grading}</div>);



					// ranking graph
					let Ranking = [];

					Ranking.push(<div class="-gap"><span class="-title">Game rankings</span></div>);
					let ranking = this.parseGamesForRanking(state.games, props.featured);
					Ranking.push(<Graph values={ranking.values} labels={ranking.lables} use_percentages={true}></Graph>);

					Data.push(<div class="section -ranking">{Ranking}</div>);
				}


				if ((state.grades != null) && (props.user.id == props.node.id)) {

					Data.push(<ContentCommonBodyTitle title="Distribution of given grades"/>);

					// my grade distribution chart
					let GradeDist = [];

					GradeDist.push(<div class="-gap"><span class="-title">Distribution of my Grading \n(current event)</span></div>);
					let gradedist = this.parseMyGradesForDist(state.grades, props.featured);
					GradeDist.push(<Graph values={gradedist.values} labels={gradedist.lables} use_percentages={true}></Graph>);

					Data.push(<div class="section -gradedist">{GradeDist}</div>);


					// my avg grade distribution chart
					let AvgGradeDist = [];

					AvgGradeDist.push(<div class="-gap"><span class="-title">Distribution of my Average Grading \n(current event)</span></div>);
					let avggradedist = this.parseMyGradesForAvgDist(state.grades);
					AvgGradeDist.push(<BarChart values={avggradedist.values} labels={avggradedist.lables} use_percentages={true}></BarChart>);

					Data.push(<div class="section -avggradedist">{AvgGradeDist}</div>);
				}
			}


			//-
			return (
				<ContentCommon {...props} class={cN(Class)}>
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
