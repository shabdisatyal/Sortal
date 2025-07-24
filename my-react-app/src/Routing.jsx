import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from './component/Header';
import App from './Pages/App';
import Stats from './Pages/Stats';
import Alerts from './Pages/Alerts';
import Recs from './Pages/Recs';
import Account from './Pages/Account';
import Analyze from "./Pages/Analyze";
import Visualize from "./Pages/Visualize";
import Update from "./Pages/Update";
import Draft from "./Pages/Draft";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <App /> },
      {
        path: 'Stats',
        element: <Stats />,
        children: [
          { path: 'Visualize', element: <Visualize /> },
          { path: 'Analyze', element: <Analyze /> },
          { path: 'Update', element: <Update /> },
          { path: 'Draft', element: <Draft /> },
        ]
      },
      { path: 'Alert', element: <Alerts /> },
      { path: 'Recs', element: <Recs /> },
      { path: 'Account', element: <Account /> },
    ],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
