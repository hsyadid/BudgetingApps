import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { dashboardLoader } from './pages/UserDashboard'
import { mainLoader } from './layout/Main'
import { Main } from './layout/Main'
import { UserDashboard, dashboardAction } from './pages/UserDashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { logoutAction } from './assets/action/logout'
import { Error } from './pages/Error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
        loader: dashboardLoader,
        errorElement: <Error />,
        action: dashboardAction
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;