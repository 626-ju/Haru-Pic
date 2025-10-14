import './global.css';
import Gnb from './components/Gnb.js';
import { Router, Route } from './components/Router/Router.js';
import Album from './pages/Album/Album.js';
import Albums from './pages/Album/Albums.js';
import Home from './pages/Home/Home.js';

export const App = () => {
  return (
    <div className="relative h-[100vh]">
      <Gnb />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/albums" component={Albums} />
        <Route path="/album/:albumId" component={Album} />
      </Router>
    </div>
  );
};
