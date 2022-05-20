import axios from 'axios';
import { Route, RouteDataFunc, Routes } from 'solid-app-router';
import { Component, createResource, lazy } from 'solid-js';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AppBuilder = lazy(() => import('./pages/AppBuilder'));

const getAppData: RouteDataFunc = ({ params }) => {
  const [app] = createResource(
    () => params.id,
    async () => {
      const res = await axios.get('http://localhost:8000/api/apps/' + params.id);
      return res.data;
    }
  );
  return app;
};

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/builder/:id" component={AppBuilder} data={getAppData} />
    </Routes>
  );
};

export default App;
