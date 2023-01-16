import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold">Terms of Use</h1>
          <p className="text-secondary fw-semibold">Last updated January 16, 2023</p>
          <p className="fs-5 mt-3">
            This Customer Agreement contains the terms and conditions that will govern your access and use of the Offered Services and constitutes an agreement between FastMusik and you or the entity you represent ("you").
            This Agreement shall be effective upon your registration with FastMusik. You represent that you have the legal capacity to enter into contracts.
          </p>
          <h2>1. Use of the services offered</h2>
          <p className="fs-5 mt-3">
            1.1. In General. You may access and use the Services in accordance with this Agreement.
            FastMusik may be subject to Service Level Agreements. You will comply with the terms of this Agreement and
            all applicable laws, rules and regulations applicable to your use of FastMusik.
          </p>
          <p className="fs-5 mt-3">
            1.2. Account. To access the Services, you must have a FastMusik account associated with a valid email address and
            payment method if your subscription requires it. Unless expressly authorized by these terms of use of the service,
            you will only create one account per email address.
          </p>
          <p className="fs-5 mt-3">
            1.3. Duration. The use of the services offered expires at the end of the subscription unless the subscription is renewed.
            The duration of this subscription is usually monthly unless you contact FastMusik and have another clause.
          </p>
          <p className="fs-5 mt-3">
            1.4. Reservation of rights. The Products are protected by copyright and other international intellectual property rights and treaties.
            FastMusik reserves all rights not granted in this Agreement. The Intellectual Property License applies to your use of the Services and Content.
          </p>
          <p className="fs-5 mt-3">
            1.5. Feedback. Feedback provided by the customer is voluntary and may be used by FastMusik for any purpose without obligation of any kind.
          </p>
          <h2>2. Data protection</h2>
          <p className="fs-5 mt-3">
            2.1. Customers and FastMusik will comply with current data protection legislation.</p>
          <p className="fs-5 mt-3">
            2.2. Confidential information. All non-public information is in any case considered confidential,
            such as user login credentials and e-mail address.
          </p>
          <p className="fs-5 mt-3">
            2.3. We will not access or use the content of your messages with other users except as necessary to maintain or provide the Offered Services,
            or to comply with a legal provision or court order from a governmental authority.
          </p>
          <p className="fs-5 mt-3">
            2.4. All other available information is used by FastMusik for monitoring and statistical purposes.
            It will never be provided to third parties.
          </p>
          <h2>3. Guarantees</h2>
          <p className="fs-5 mt-3">
            3.1. Services. The FastMusik team guarantees the service offered by means of a defined SLA available to the client.
            The compensation received by the client is defined in the
            <Link to="/customer-agreement/sla" className="darkBlueText text-decoration-none fw-semibold">
              SLA
            </Link>.
          </p>
          <p className="fs-5 mt-3">
            3.2. Support. The management of incidents or reports is carried out through the
            <a href="https://client-fastmusik-marmolpen3.cloud.okteto.net/" className="darkBlueText text-decoration-none fw-semibold">
              support center
            </a>.
          </p>
          <h2>4. Changes</h2>
          <p className="fs-5 mt-3">
            4.1. Service. We may change or discontinue the service by giving users prior notice.
            We will notify you at least 6 months in advance when discontinuing an important functionality of the service.
            Unless it is strictly necessary in order not to breach FastMusik customer information.
          </p>
          <p className="fs-5 mt-3">
            4.2 Agreements. We may change, modify or add terms within this Agreement or the Service Level Agreement by giving 3 months' notice.
            Except as necessary to ensure the needs of FastMusik and its customers.
          </p>
          <h2>5. Limitation of liability</h2>
          <p className="fs-5 mt-3">
            5.1. Service. The credits returned to you in the event of default may not exceed the amount you have contributed with your dues in the last year.
          </p>
          <p className="fs-5 mt-3">
            5.2. Exclusions. In no event shall FastMusik be liable for indirect, incidental, special or consequential damages.
          </p>
          <h2>6. Fees and payments</h2>
          <p className="fs-5 mt-3">
            6.1. Non-payment of fees. Failure to pay any of the subscription fees will limit access to your account and use of the services offered by FastMusik.
            In addition, fees more than 30 days overdue will be added a fee of 1% of the total.
          </p>
          <h2>7. Duration and termination</h2>
          <p className="fs-5 mt-3">
            7.1. Duration. This Agreement shall be in force until the end of the contracted period. At the time of termination, the contract shall only be effective for causes prior to that time.
          </p>
          <p className="fs-5 mt-3">
            7.2. Justified cause. The breach of this contract by any of the parties, the misuse of the services and the quality of the service offered are justified causes for immediate termination of this contract.
          </p>
          <p className="fs-5 mt-3">
            7.3. Unjustified cause. Either party must give 30 days' notice of termination of the subscription.
            Please note that the contracted services will be available to you until the end of your subscription.
          </p>
          <h2>8. Definitions</h2>
          <ul className="fs-5">
            <li className="mt-3">
              <strong>Service Level Agreement or SLA</strong>. Contractual document where FastMusik's minimum service level is specified.
            </li>
            <li className="mt-3">
              <strong>Support Centre</strong>. Platform offered by FastMusik to ensure that customers can make complaints and report offensive messages.
            </li>
            <li className="mt-3">
              <strong>Offered Services</strong>. The services offered by FastMusik to its customers, specifically FastMusik.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Terms;