import config from '~/config';

import { NotFoundLayout, AuthLayout, DefaultLayout } from '~/Layouts';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import NotFound from '~/pages/NotFound';
import Forbidden from '~/pages/Forbidden';
import ServerError from '~/pages/ServerError';
import Dashboard from '~/pages/Dashboard/Dashboard';

const publicRoutes = [
  { path: config.routes.login, component: SignIn, layout: AuthLayout },
  { path: config.routes.home, component: Home },
  { path: config.routes.notFound, component: NotFound, layout: NotFoundLayout },
  { path: config.routes.forbidden, component: Forbidden, layout: NotFoundLayout },
  { path: config.routes.internalServer, component: ServerError, layout: NotFoundLayout },
  { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
