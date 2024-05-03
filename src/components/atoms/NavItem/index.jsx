import { Link } from 'react-router-dom';

const NavItem = ({ children, href }) => {
  const isActive = window.location.pathname === href;
  return (
    <li>
      <Link
        to={href}
        className={`block py-2 px-3  rounded md:p-0 ${
          isActive ? 'text-blue-700' : 'text-gray-900'
        }`}
        aria-current="page"
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
