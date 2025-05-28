import { NavLink } from "react-router-dom";

function NoPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center">
      <h1 className="display-4 fw-bold text-dark">404 - Page Not Found</h1>
      <p className="mt-3 text-secondary">
        The page you are looking for does not exist.
      </p>
      <NavLink
        to="/dashboard"
        className="mt-4 text-primary text-decoration-underline"
      >
        Go back to Dashboard
      </NavLink>
    </div>
  );
}

export default NoPage;
