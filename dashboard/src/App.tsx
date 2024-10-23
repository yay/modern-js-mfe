import { BrowserRouter, Route, Routes } from '@modern-js/runtime/router';

// You need to parse from `props` and pass `basename` to BrowserRouter.
export default (props: { basename: string }) => {
  const { basename } = props;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<div>Self-controlled route root</div>} />
        <Route path={'path'} element={<div>Self-controlled sub route</div>} />
      </Routes>
    </BrowserRouter>
  );
};
