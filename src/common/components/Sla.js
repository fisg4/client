function Sla() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold">FastMusik Service Level Agreement</h1>
          <p className="text-secondary fw-semibold">Last updated January 16, 2023</p>

          <p className="fs-5 mt-3">
            This FastMusik Service Level Agreement (FastMusik SLA)
            details the performance expectations of the music platform
            offered by FastMusik and its support system, applying independently
            to each account.  In the event that any of the terms of the Customer
            Agreement conflict with the terms of this SLA, the terms and conditions
            described in this SLA apply.
          </p>

          <h2>Commitments</h2>
          <p className="fs-5 mt-3">
            The FastMusik team will make every effort to ensure that the availability of the service is at least an Uptime Percentage of 85% evaluated on a monthly basis. In the event that FastMusik does not meet this Commitment, you may request a Percentage Credit according to the following table.
          </p>
          <table className="table fs-5">
            <thead>
              <tr>
                <th scope="col">Uptime percentage</th>
                <th scope="col">Credit percentage</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>between 60% and 85%</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>between 30% and 60%</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>less than 30%</td>
                <td>20%</td>
              </tr>
            </tbody>
          </table>
          <p className="fs-5 mt-3">
            The credit percentage is calculated as a percentage of the total credit paid by you on a monthly basis.
            It will be applied only to future charges and is also issued to the card you used to sign up.
          </p>

          <h2>Credit Request and Payment Procedures</h2>
          <p className="fs-5 mt-3">
          In order to receive compensation for non-compliance you must generate a ticket in the FastMusik support center.
          Including the following content:
          </p>
          <ol className="fs-5">
            <li className="mt-3">The title must be 'CREDIT REQUEST FOR NON-COMPLIANCE WITH THE FASTMUSIK SLA'.</li>
            <li className="mt-3">The body of the message must contain:</li>
              <ul>
                <li className="mt-2">Date and time of non-availability of the service.</li>
                <li className="mt-2">Explanation of the problem.</li>
                <li className="mt-2">Any evidence that proves the truth of the interruption.</li>
              </ul>
            <li className="mt-3">The priority must be "medium".</li>
          </ol>
          <p className="fs-5 mt-3">
          If the FastMusik Team confirms your request and you are still subscribed to the service, your next month's
          fee will be reduced by the appropriate percentage. Otherwise, we will grant you a credit at any time during
          the three months following the confirmation of your request.
          </p>

          <h2>Exclusions</h2>
          <p className="fs-5 mt-3">
          This SLA will have no effect when the problem of unavailability, suspension or performance of the service
          is caused by factors beyond our control such as internet access or environmental problems. Nor will it
          affect issues arising from your device, software or incompatibilities. As well as the termination of the
          contract that you share with FastMusik for any of the causes listed in the Terms of Use.
          </p>

          <h2>Definitions</h2>
          <p className="fs-5 mt-3">
            <ul>
              <li className="mt-2"><strong>Percentage Credit</strong>. The percentage that is refunded when FastMusik team fails to meet this SLA.</li>
              <li className="mt-2"><strong>Uptime Percentage</strong>. It is calculated as 100% of minutes during the month in which the FastMusik service is available.</li>
            </ul>
          </p>


        </div>
      </div>
    </div>
  )
}

export default Sla;