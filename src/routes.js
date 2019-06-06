import Route from './utils/route';

Route.auth('/', 'Home');
Route.auth('/book/:slug/:type', 'Detail');
Route.auth('/book/slot/:slug/:type', 'Book');

export default Route.routes;
