import { NavLink } from "react-router-dom";

const Header = ({ user }) => {
    if (user && user._id) {
        return (
            <>
                <div className="container">
                    <nav className="navbar navbar-expand-lg bg-info">
                        <h1>CHITTER</h1>
                        <div className="container-fluid me-auto mb-2 mb-lg-0">
                            <NavLink className="nav-link" to="/">Peep Feed</NavLink>
                            <NavLink className="nav-link" to="/post">Peep!</NavLink>
                            <NavLink className="nav-link" to="/logout">Sign out</NavLink>
                        </div>
                    </nav>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="container">
                    <nav className="navbar navbar-expand-lg bg-info">
                        <div className="container-fluid me-auto mb-2 mb-lg-0">
                            <h1>CHITTER</h1>
                            <NavLink className="nav-link" to="/">Peep Feed</NavLink>
                            <NavLink className="nav-link" to="/register">Sign Up!</NavLink>
                            <NavLink className="nav-link" to="/login">Log In!</NavLink>
                        </div>
                    </nav>
                </div>
            </>
        )
    }
}

export default Header;