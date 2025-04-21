import { Link } from 'react-router-dom'

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav">
      <ul>
        <li className="nav-item">
          <Link to="/" className="nav-link">Search Candidates</Link>
        </li>
        <li className="nav-item">
          <Link to="/SavedCandidates">Saved Candidates</Link>
        </li>
      </ul>

    </div>
  )
};

export default Nav;
