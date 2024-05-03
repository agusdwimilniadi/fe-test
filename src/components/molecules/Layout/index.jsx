import Navbar from '../Navbar';

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className="mx-20 my-10">{children}</div>
    </main>
  );
};

export default Layout;
