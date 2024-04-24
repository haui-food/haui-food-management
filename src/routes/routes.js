import config from '~/config';

import { NotFoundLayout, AuthLayout } from '~/Layouts';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import NotFound from '~/pages/NotFound';
import Forbidden from '~/pages/Forbidden';
import ServerError from '~/pages/ServerError';

const publicRoutes = [
  { path: config.routes.login, component: SignIn, layout: AuthLayout },
  { path: config.routes.home, component: Home },
  { path: config.routes.notFound, component: NotFound, layout: NotFoundLayout },
  { path: config.routes.forbidden, component: Forbidden, layout: NotFoundLayout },
  { path: config.routes.internalServer, component: ServerError, layout: NotFoundLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
