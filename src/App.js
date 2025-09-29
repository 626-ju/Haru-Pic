import './global.css';
import Gnb from './components/Gnb.js';
import Home from './pages/Home/Home.js';

export const App = () => {
  return (
    <div className="relative h-[100vh]">
      <Gnb />
      <Home />
    </div>
  );
};
