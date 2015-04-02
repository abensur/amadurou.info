var React  = require('react'),
	Router = require('react-router'),
	Header = require('./commons/Header'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render: function () {
		return (
			<div className="app">
				<Header/>
				<main className="app__content">
					<RouteHandler/>
				</main>
			</div>
		);
	}

});

module.exports = App;
