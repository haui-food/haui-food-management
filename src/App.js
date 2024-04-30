import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { privateRoutes, publicRoutes } from '~/routes';
import ProtectedRoute from './routes/protectedRoute';
import DefaultLayout from './Layouts';

function App() {
  return (
    <Router>
      <AppBody />
    </Router>
  );
}

function AppBody() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const { component: Page, layout: Layout = DefaultLayout } = route;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        
        {privateRoutes.map((route, index) => {
          const { component: Page, layout: Layout = DefaultLayout } = route;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
