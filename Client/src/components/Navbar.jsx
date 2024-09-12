import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <nav className="navbar navbar-expand-sm  fixed-top" style={{ backgroundColor: "#4379F2" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Chat App
        </Link>

        <div className="navbar-nav mx-auto">
          {token && (
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Dashboard
              </Link>
            </li>
          )}
          {!token && (
            <>
              {" "}
              <li className="nav-item">
                <Link className="nav-link active" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
          {token && (
            <li className="nav-item">
              <Link
                className="nav-link active"
                onClick={() =>{ localStorage.clear()
                window.location.href = "/"
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </div>
        {token && (
          <div>
          <h4>welcome {localStorage.getItem("name")}</h4>
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
