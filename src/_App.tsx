// Self-controlled (as opposed to file-based) route.

import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from '@modern-js/runtime/router';

import { defineConfig } from '@modern-js/runtime';

const AppLayout = () => (
  <>
    <div>
      <Link to={'/table'}>Loading conventional routed sub-applications</Link>
    </div>
    <div>
      <Link to={'/dashboard'}>
        Loading Self-Controlled Routing Sub-Applications
      </Link>
    </div>
    <div>
      <Link to={'/'}>Uninstall a sub-application</Link>
    </div>
    <Outlet />
  </>
);

function App() {
  const { apps, MApp, Table, Dashboard } = useModuleApps();

  // If you are not using the MApp component, you need to use createBrowserRouter to create the route.
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route key={'table'} path={'table/*'} element={<Table />} />
        <Route key={'dashboard'} path={'dashboard/*'} element={<Dashboard />} />
      </Route>,
    ),
  );

  return (
    // Approach 1: Use MApp to automatically load sub-applications based on the configured activeWhen parameter (this project is configured in modern.config.ts)
    // <BrowserRouter>
    //   <MApp />
    // </BrowserRouter>

    // Approach 2: Manually write Route components to load sub-applications, which is convenient for scenarios that require authentication and other pre-requisite operations
    <>
      <RouterProvider router={router} />
    </>
  );
}

defineConfig(App, {
  masterApp: {
    apps: [
      {
        name: 'DashBoard',
        entry: 'http://127.0.0.1:8081/',
        activeWhen: '/table',
      },
      {
        name: 'TableList',
        entry: 'http://localhost:8082',
        activeWhen: '/dashboard',
      },
    ],
  },
});

// defineConfig(App, {
//   masterApp: {
//     manifest: {
//       getAppList: async () => {
//         // get from remote api
//         return [
//           {
//             name: 'Table',
//             entry: 'http://localhost:8081',
//             // activeWhen: '/table'
//           },
//           {
//             name: 'Dashboard',
//             entry: 'http://localhost:8082',
//             // activeWhen: '/dashboard'
//           },
//         ];
//       },
//     },
//   },
// });

export default App;
