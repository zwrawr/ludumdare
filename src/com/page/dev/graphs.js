import {h, Component}		from 'preact/preact';
import ContentPalette		from 'com/content-palette/palette';
import Graph				from 'com/visualization/graph/graph';
import BarChart				from 'com/visualization/barchart/barchart';
import PieChart				from 'com/visualization/piechart/piechart';

export default class PageDevGraph extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      'graph1': {},
      'graph2': {},
      'pie1': {},
      'pie2': {},
      'bar1': {},
      'bar2': {},
    };

  }

  componentWillMount() {

      this.setState({
        'graph1': this.genGraphOne(),
        'graph2': this.genGraphTwo(),
        'pie1': this.genPieOne(),
        'pie2': this.genPieTwo(),
        'bar1': this.genBarOne(),
        'bar2': this.genBarTwo()
      });
  }

  //use_percentages={false} hideLegend showXAxis showYAxis showYTick
  genGraphOne() {
    return {
		'values': [
			{
				'x': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				'y': [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
			},
			{
				'x': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				'y': [10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10]
			},
			{
				'x': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
				'y': [10, 7.5, 0, -7.5, -10, -7.5, 0, 7.5, 10, 7.5, 0, -7.5, -10, -7.5, 0, 7.5, 10]
			}

		],
		'labels': ["alternating", "high low", "triangle"],
		'use_percentages': false
	};
  }

  genGraphTwo() {
    return {};
  }

  genPieOne() {
    return {
      'values': [1, 2, 3],
      'labels': ["apple", "bannana", "orange"],
      'use_percentages': true
    };
  }

  genPieTwo() {
    return {
      'values': [100, 200, 300, 1],
      'labels': ["apple", "bannana", "orange", "small"],
      'use_percentages': false
    };
  }

  genBarOne() {
    return {
      'values': [1, 2, 3, 4, 5, 10, 9, 8, 7, 6],
      'labels': ["apple", "bannana", "fig", "grape", "kiwi", "pineapple", "strawberry", "blackberry", "current", "orange"],
      'use_percentages': true
    };
  }

  genBarTwo() {
    return {
      'values': [-1, 2, -3, 4, -5, 10, -9, 8, -7, 6],
      'labels': ["apple", "bannana", "fig", "grape", "kiwi", "pineapple", "strawberry", "blackberry", "current", "orange"],
      'use_percentages': false
    };
  }
/*
<Graph labels={this.state['graph1'].labels} values={this.state['graph1'].values} use_percentages={this.state['graph1'].use_percentages}/>
<Graph labels={this.state['graph2'].labels} values={this.state['graph2'].values} use_percentages={this.state['graph2'].use_percentages}/>
*/

  render( props, state ) {

	console.log(state);

    return (
		<div id="content">
			<div class="content-common">
				<BarChart labels={state['bar1'].labels} values={state['bar1'].values} use_percentages={state['bar1'].use_percentages}/>
				<BarChart labels={state['bar2'].labels} values={state['bar2'].values} use_percentages={state['bar2'].use_percentages} hideLegend showXAxis showYAxis showYTicks/>
				<PieChart labels={state['pie1'].labels} values={state['pie1'].values} use_percentages={state['pie1'].use_percentages}/>
				<PieChart labels={state['pie2'].labels} values={state['pie2'].values} use_percentages={state['pie2'].use_percentages}/>
				<Graph labels={state['graph1'].labels} values={state['graph1'].values} use_percentages={state['graph1'].use_percentages}/>
			</div>
		</div>
    );
  }
}
