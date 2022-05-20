import { Route, Routes } from 'solid-app-router';
import { Component, lazy } from 'solid-js';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AppBuilder = lazy(() => import('./pages/AppBuilder'));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/:id" component={AppBuilder} />
    </Routes>
  );
};

export default App;
