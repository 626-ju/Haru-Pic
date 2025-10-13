import './global.css';
import Gnb from './components/Gnb.js';
import { Router, Route } from './components/Router/Router.js';
import Home from './pages/Home/Home.js';
import Temp from './pages/Temp/index.js';

export const App = () => {
  return (
    <div className="relative h-[100vh]">
      <Gnb />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/temp" component={Temp} />
      </Router>
    </div>
  );
};
