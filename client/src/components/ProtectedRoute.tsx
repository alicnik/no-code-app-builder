import { Navigate, Route, RouteProps } from 'solid-app-router';
import { Component, ParentProps, Show } from 'solid-js';
import { useAuth } from '../context/Auth';

export const ProtectedRoute: Component<RouteProps> = ({
  children,
  ...rest
}: ParentProps<RouteProps>) => {
  const auth = useAuth();
  console.log(auth.isLoggedIn);
  return (
    <Show when={auth.isLoggedIn} fallback={<Navigate href="/login" />}>
      <Route {...rest}>{children}</Route>
    </Show>
  );
};

export default ProtectedRoute;
