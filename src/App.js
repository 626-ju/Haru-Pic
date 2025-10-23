import './global.css';
import Gnb from './components/Gnb.js';
import { Router, Route, router } from './components/Router/Router.js';
import ScrollTop from './components/ScrollTop.js';
import AddAlbum from './pages/AddAlbum/AddAlbum.js';
import Album from './pages/Album/Album.js';
import Albums from './pages/Album/Albums.js';
import Home from './pages/Home/Home.js';
import AddAlbumKey from './pages/AddAlbumKey.js';

export const App = () => {

  return (
    <div className="relative h-[100vh]">
      <Gnb />
      <div className="mt-20">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/albums" component={Albums} />
          <Route path="/album/:albumId" component={Album} />
          <Route path="/newpost" component={AddAlbum} />
          <Route path="/identify" component={AddAlbumKey} />
        </Router>
      </div>
      <ScrollTop />
    </div>
  );
};
