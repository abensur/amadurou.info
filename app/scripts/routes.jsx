var React    = require('react/addons'),
	Router   = require('react-router'),
	App      = require('./components/App'),
	Home     = require('./components/Home'),
	Table    = require('./components/Table'),
	NotFound = require('./components/NotFound');

/*var DefaultRoute  = Router.DefaultRoute,
	Link          = Router.Link,
	Route         = Router.Route,
	NotFoundRoute = Router.NotFoundRoute,
	RouteHandler  = Router.RouteHandler;*/
var { Route, DefaultRoute, RouteHandler, Link, NotFoundRoute } = Router;

var routes = (
	<Route handler={App}>
		<Route name="home" handler={Home}/>'
		<Route name="table" handler={Table}/>
		<DefaultRoute handler={Home}/>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

document.addEventListener('DOMContentLoaded', function () {
	Router.run(routes, Router.HistoryLocation, function (Handler) {
		React.render(<Handler/>, document.getElementById('react'));
	});
});
