var React = require('react'),
	Router = require('react-router'),
	Header = require('./commons/Header'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render: function () {
		return (
			<div>
				<Header/>

				{/* this is the important part */}
				<RouteHandler/>
			</div>
		);
	}

});

module.exports = App;
