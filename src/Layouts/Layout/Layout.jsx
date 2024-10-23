import { Outlet } from "react-router";
import Header from "../Header/Header";
import Navber from "../Navber/Navber";
import Footer from "../Footer/Footer";

function Layout({products, carts}) {
  return (
    <div>
      <Header />
      <Navber products={products} carts={carts} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
