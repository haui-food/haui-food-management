import config from '~/config';

import { NotFoundLayout, AuthLayout, DefaultLayout } from '~/Layouts';

import SignIn from '~/pages/SignIn';
import NotFound from '~/pages/NotFound';
import Forbidden from '~/pages/Forbidden';
import ServerError from '~/pages/ServerError';
import Dashboard from '~/pages/Dashboard/Dashboard';
import Users from '~/pages/Users';
import Account from '~/pages/Account';
import Category from '~/pages/Category';
import Contact from '~/pages/Contact';
import ShopDashboard from '~/pages/ShopDashboard';
import Orders from '~/pages/Orders';
import ShopProducts from '~/pages/ShopProducts';
import Products from '~/pages/Products';

const publicRoutes = [
  { path: config.routes.login, component: SignIn, layout: AuthLayout },
  { path: config.routes.notFound, component: NotFound, layout: NotFoundLayout },
  { path: config.routes.forbidden, component: Forbidden, layout: NotFoundLayout },
  { path: config.routes.internalServer, component: ServerError, layout: NotFoundLayout },
];

const privateRoutes = [
  { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
  { path: config.routes.users, component: Users, layout: DefaultLayout },
  { path: config.routes.account, component: Account, layout: DefaultLayout },
  { path: config.routes.categories, component: Category, layout: DefaultLayout },
  { path: config.routes.contacts, component: Contact, layout: DefaultLayout },
  { path: config.routes.shopDashboard, component: ShopDashboard, layout: DefaultLayout },
  { path: config.routes.products, component: Products, layout: DefaultLayout },
  {
    path: config.routes.shopOders,
    component: Orders,
    layout: DefaultLayout,
  },
  {
    path: config.routes.shopProducts,
    component: ShopProducts,
    layout: DefaultLayout,
  },
];

export { publicRoutes, privateRoutes };
