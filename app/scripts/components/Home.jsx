var React     = require('react'),
	Bootstrap = require('react-bootstrap'),
	_         = require('lodash'),
	$         = require('jquery'),
	footable  = require('footable'),
	config    = require('../config'),
	Loader    = require('./commons/Loader');

var Home = React.createClass({

	getInitialState: function () {
		return {
			ready: false,
			food: undefined,
			types: []
		};
	},

	componentDidMount: function () {
		var data = require('../../data/food');

		if (data.alimentos) {
			var types = [];
			_.each(data.alimentos, function (item) {
				if (types.indexOf(item.tipo) === -1) {
					types.push(item.tipo);
				}
			});
			this.setState({
				ready: true,
				food: data.alimentos,
				types: types.sort(function (a, b) {
					return a > b;
				})
			});
		}
	},

	componentDidUpdate: function () {
		var $table     = $(React.findDOMNode(this.refs.foodTable)),
			isFootable = this.refs.foodTable && typeof $table.data('footable') === 'object';

		if (this.state.food && this.state.food.length > 0) {
			if (!isFootable) {
				$table
					.footable()
					.find('tr')
					.trigger('footable_toggle_row');
			}

			$table.data('footable').redraw();
		}
	},

	_filterResults: function (e) {
		e.preventDefault();
	},

	_onChangeFilter: function (e) {
		$(React.findDOMNode(this.refs.foodTable)).trigger('footable_filter', {
			filter: e.currentTarget.value
		});
	},

	render: function () {
		var html,
			food = this.state.food,
			rows,
			meses;

		if (this.state.ready) {

			meses = config.meses.map(function (mes) {
				return (<th data-toggle="true" data-hide="phone,tablet">{mes[0]}</th>);
			});

			html = (
				<div className="natural-form">
					Eu quero comer <span className="term type">alimento</span> que estejam na <span className="term type">epoca</span>
				</div>
			);
		}
		else {
			html = <Loader/>;
		}
		return (
			<div key="Home" className="home">
				<div className="container">{html}</div>
			</div>
		);
	}

});

module.exports = Home;
