import config from '~/config';

import { NotFoundLayout, AuthLayout, DefaultLayout } from '~/Layouts';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import NotFound from '~/pages/NotFound';
import Forbidden from '~/pages/Forbidden';
import ServerError from '~/pages/ServerError';
import Dashboard from '~/pages/Dashboard/Dashboard';
import Users from '~/pages/Users';
import Account from '~/pages/Account';

const publicRoutes = [
  { path: config.routes.login, component: SignIn, layout: AuthLayout },
  { path: config.routes.notFound, component: NotFound, layout: NotFoundLayout },
  { path: config.routes.forbidden, component: Forbidden, layout: NotFoundLayout },
  { path: config.routes.internalServer, component: ServerError, layout: NotFoundLayout },
  // { path: config.routes.home, component: Home },
  // { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
  // { path: config.routes.users, component: Users, layout: DefaultLayout },
  // { path: config.routes.account, component: Account, layout: DefaultLayout },
];

const privateRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
  { path: config.routes.users, component: Users, layout: DefaultLayout },
  { path: config.routes.account, component: Account, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
