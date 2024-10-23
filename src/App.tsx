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

const AppLayout = () => (
  <>
    <div>
      <Link to={'/table'}>load file-based sub-app</Link>
    </div>
    <div>
      <Link to={'/dashboard'}>load self-controlled sub-app</Link>
    </div>
    <div>
      <Link to={'/'}>unmount sub-app</Link>
    </div>
    <Outlet />
  </>
);

export default () => {
  const { apps, MApp } = useModuleApps();

  // Instead of using the MApp component, you need to use createBrowserRouter to create the route
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        {apps.map(app => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          const Component = app.Component as any;
          // Fuzzy match, path needs to be written in a pattern similar to abc/*
          return (
            <Route
              key={app.name}
              path={`${app.name.toLowerCase()}/*`}
              element={
                <Component
                  loadable={{
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    loading: ({ pastDelay, error }: any) => {
                      if (error) {
                        return <div>error: {error?.message}</div>;
                      }
                      if (pastDelay) {
                        return <div>loading</div>;
                      }
                      return null;
                    },
                  }}
                />
              }
            />
          );
        })}
      </Route>,
    ),
  );

  return (
    // Use MApp to automatically load sub-applications according to the configured activeWhen parameters (this project is configured in modern.config.ts)
    // <BrowserRouter>
    //   <MApp />
    // </BrowserRouter>

    // Manually write the Route component to load the sub-application, which is convenient for scenarios that require pre-operation such as authentication
    <>
      <RouterProvider router={router} />
    </>
  );
};
