function Pricing() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold">Pricing</h1>
          <div className="likeCard bg-blue row mt-4 p-1">
            <table className="table table-hover fs-4">
              <thead>
                <tr>
                  <th scope="col">Compare features by plan:</th>
                  <th className="text-center" scope="col">Basic</th>
                  <th className="text-center" scope="col">Pro</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td>Song search</td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
                  <td className="text-center"><i className="h1 bi bi-check-circle-fill textGreen"></i></td>
                </tr>
                <tr>
                  <td>Add songs to the system</td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"> </i>
                    <p className="fw-semibold fs-6">* limited to 5</p></td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                    <p className="fw-semibold fs-6">unlimited</p>
                  </td>
                </tr>
                <tr>
                  <td>Video and lyrics editing</td>
                  <td className="text-center">
                    <i className="h1 bi bi-x-circle-fill textRed"></i>
                  </td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
                </tr>
                <tr>
                  <td>Messaging with other like-minded users</td>
                  <td className="text-center">
                    <i className="h1 bi bi-x-circle-fill textRed"></i>
                  </td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
                </tr>
                <tr>
                  <td>Report offensive messages</td>
                  <td className="text-center">
                    <i className="h1 bi bi-x-circle-fill textRed"></i>
                  </td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
                </tr>
                {/* <tr>
                <td>Email confirmation of accepted report</td>
                <td className="text-center">
                <i className="h1 bi bi-x-circle-fill textRed"></i>
                </td>
                <td className="text-center">
                  <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
              </tr> */}
                <tr>
                  <td>Incidence of fake urls</td>
                  <td className="text-center">
                    <i className="h1 bi bi-x-circle-fill textRed"></i>
                  </td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
                </tr>
                <tr>
                  <td>Support</td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                  </td>
                  <td className="text-center">
                    <i className="h1 bi bi-check-circle-fill textGreen"></i>
                    <p className="fw-semibold fs-6">guaranteed by SLA</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;