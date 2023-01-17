import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="text-center">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link to="/customer-agreement" className="nav-link px-2 text-muted">Agreements</Link></li>
                <li className="nav-item"><Link to="/pricing" className="nav-link px-2 text-muted">Pricing</Link></li>
                <li className="nav-item"><Link to="/support" className="nav-link px-2 text-muted">Contact us</Link></li>
            </ul>
            <p>© 2022 FastMusik app - Made with <i className="bi bi-heart-fill text-purple"></i></p>
        </footer>
    );
}

export default Footer;