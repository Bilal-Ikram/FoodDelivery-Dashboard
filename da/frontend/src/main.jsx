import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Layout.jsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter  } from'react-router-dom'
import Dashboard from './components/Dashboard/pages/DashBoard.jsx';
import Orders from './components/Orders/pages/Orders.jsx';
import Reports from './components/Reportsjsx/pages/Reports.jsx';
import Invoices from './components/Invoices/Pages/Invoices.jsx';
import MenuManagement from './components/MenuManagement/Pages/MenuManagement.jsx';
import OpeningTime from './components/OpeningTime/pages/OpeningTime.jsx';
import Support from './components/Support/pages/Support.jsx';
import UserManagement from './components/UserManagement/pages/UserManagement.jsx';

const router = createBrowserRouter([
  {
    path: "/dashboard/:sessionId",
    element: <App />,
    // component: NotFound
    children: [
      { index: true, element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "reports", element: <Reports /> },
      { path: "invoices", element: <Invoices /> },
      { path: "menu-management", element: <MenuManagement /> },
      { path: "opening-time", element: <OpeningTime /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "support", element: <Support /> }
      // { path: "*", element: <NotFound /> },
    ]
  },
]);
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
