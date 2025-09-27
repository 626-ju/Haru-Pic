import './global.css';
import Home from './pages/Home.js';
import Gnb from './components/Gnb.js';

export const App = () => {
  return (
    <div className='bg-[#EAEDF2] h-[100vh]' >
      <Gnb/>
      <Home />
    </div>);
};
