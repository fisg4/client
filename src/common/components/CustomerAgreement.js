import { Link } from "react-router-dom";

function CustomerAgreement() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold">Customer Agreement</h1>
          <p className="fs-4 mt-4">
            This <span className="fw-semibold">FastMusik Customer Agreement </span>
            contains all the terms and conditions that apply to the FastMusik service.
          </p>

          <h2 className="fw-bold mt-5">
            General Terms
          </h2>
          <p className="fs-5 mt-3">
            By accessing or using FastMusik website, you agree to be bound by these Terms
            and all applicable laws and regulations.
            These Terms may be updated or modified from time to time, so please check back
            regularly.
          </p>
          <p className="fs-5 mt-3">If you have any questions, please do not hesitate to
            <Link to="/support" className="darkBlueText text-decoration-none fw-semibold"> contact us</Link>.
          </p>
          <Link to="/customer-agreement/terms-of-use" className="darkBlueText text-decoration-none fs-3 fw-semibold">
            <i className="bi bi-file-text text-dark fs-2"></i> General Terms
          </Link>

          <h2 className="fw-bold mt-5">
            Service Level Agreement
          </h2>
          <p className="fs-5 mt-3">
            This Service Level Agreement (SLA) outlines the service levels, responsibilities,
            and guarantees related to the services provided. By using our website, you agree
            to the terms and conditions outlined in this SLA.
          </p>
          <Link to="/customer-agreement/sla" className="darkBlueText text-decoration-none fs-3 fw-semibold">
            <i className="bi bi-file-text text-dark fs-2"></i> SLA
          </Link>

          <h2 className="fw-bold mt-5">
            Pricing
          </h2>
          <p className="fs-5 mt-3">
            Flexible pricing options to suit your needs.
          </p>
          <Link to="/pricing" className="darkBlueText text-decoration-none fs-3 fw-semibold">
            <i className="bi bi-file-text text-dark fs-2"></i> Pricing
          </Link>

        </div>
      </div>
    </div>
  );
}

export default CustomerAgreement;