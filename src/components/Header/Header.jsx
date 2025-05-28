import "./Header.css";

function Header({ children, ...rest }) {
  return <header {...rest}>{children}</header>;
}

export default Header;
