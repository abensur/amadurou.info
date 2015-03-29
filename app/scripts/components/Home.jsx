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
			rows = food.map(function (d, i) {
				return (<tr key={'food-' + i}>
					<td>{d.nome}</td>
					<td>{d.tipo}</td>
					{
						config.meses.map(function (mes) {
							return (
								<td className={(d[mes[1]] === 'Regular' ? 'bg-warning text-warning' : (d[mes[1]] === 'Forte' ? 'bg-success text-success' : 'text-muted'))}>{d[mes[1]]}</td>);
						})
					}

				</tr>);
			});

			meses = config.meses.map(function (mes) {
				return (<th data-toggle="true" data-hide="phone,tablet">{mes[0]}</th>);
			});

			html = <div className="food__table">
				<Bootstrap.Row>
					<Bootstrap.Col xs={12} sm={12} md={12}>
						<div className="footable__filter">
							<form className="form-horizontal" onSubmit={this._filterResults}>
								<Bootstrap.Input className="filter-tipo" type="select" label="Tipo"
												 onChange={this._onChangeFilter} labelClassName="col-xs-3"
												 wrapperClassName="col-xs-9">
									<option key="0" value=""></option>
									{this.state.types.map(function (type) {
										return <option key={type} value={type}>{type}</option>;
									})}
								</Bootstrap.Input>
								<Bootstrap.Input id="filter" type="text" label="Procura" labelClassName="col-xs-3"
												 wrapperClassName="col-xs-9"/>
							</form>
						</div>
					</Bootstrap.Col>
				</Bootstrap.Row>
				<table className="footable table" ref="foodTable" data-page-size="20" data-filter="#filter">
					<thead>
					<tr>
						<th data-toggle="true">Nome</th>
						<th data-toggle="true">Tipo</th>
						{meses}
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
					<tfoot className="hide-if-no-paging">
					<tr>
						<td colSpan={14}>
							<div className="pagination pagination-centered"></div>
						</td>
					</tr>
					</tfoot>
				</table>
			</div>;
		}
		else {
			html = <Loader/>;
		}
		return (
			<div key="Home">
				<div className="container">{html}</div>
			</div>
		);
	}

});

module.exports = Home;
