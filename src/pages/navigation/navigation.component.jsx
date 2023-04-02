import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signUserOut } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";

export default function Navigation() {
  const { currentUser } = React.useContext(UserContext);
  const { isCartOpen } = React.useContext(CartContext);

  async function handleSignOut() {
    await signUserOut();
  }

  return (
    <>
      <header className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>

        <nav className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </nav>

        {isCartOpen && <CartDropdown />}
      </header>

      <Outlet />
    </>
  );
}
