var React    = require('react/addons'),
	Router   = require('react-router'),
	App      = require('./components/App'),
	Home     = require('./components/Home'),
	NotFound = require('./components/NotFound');

var DefaultRoute  = Router.DefaultRoute,
	Link          = Router.Link,
	Route         = Router.Route,
	NotFoundRoute = Router.NotFoundRoute,
	RouteHandler  = Router.RouteHandler;

window.React = React;

var routes = (
	<Route handler={App}>
		<Route name="home" handler={Home}/>
		<DefaultRoute handler={Home}/>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

document.addEventListener('DOMContentLoaded', function () {
	Router.run(routes, Router.HistoryLocation, function (Handler) {
		React.render(<Handler/>, document.getElementById('app'));
	});
});
