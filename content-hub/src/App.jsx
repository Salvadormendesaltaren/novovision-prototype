import HubHomePage from './pages/HubHomePage';
import NovoNordiskPage from './pages/NovoNordiskPage';

const BASE = '/novovision-prototype';

function getRoute() {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.pathname.replace(/\/+$/, '');
  const stripped = raw.startsWith(BASE) ? raw.slice(BASE.length) : raw;
  return stripped || '/';
}

export default function App() {
  const route = getRoute();

  if (route === '/novo-nordisk') {
    return <NovoNordiskPage />;
  }

  return <HubHomePage />;
}
