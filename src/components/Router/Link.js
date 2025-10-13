import { router } from './Router.js';

const Link = ({ to, children, ...props }) => {
  function handleMove(e) {
    e.preventDefault();
    router.push(to);
  }

  return (
    <a href={to} onClick={handleMove} {...props}>
      {children}
    </a>
  );
};

export default Link;
