
import Logo from './Logo'

interface NavBarProp{
  children : React.ReactNode
}

const NavBar = ({ children } :  NavBarProp) => {
  return (
    <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
  )
}

export default NavBar


