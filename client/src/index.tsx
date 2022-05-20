/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { HopeProvider } from '@hope-ui/solid';
import { AuthProvider } from './context/Auth';

import App from './App';

render(
  () => (
    <Router>
      <AuthProvider>
        <HopeProvider>
          <App />
        </HopeProvider>
      </AuthProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
