import React, { useState, useEffect } from 'react';

function ReportList() {
  const [reports, setReports] = useState([]);
  // const [loading, setLoading] = useState(true);

  // function viewReport(reportName) {
  //   const reportUrl = `https://to1zh74r43.execute-api.eu-west-2.amazonaws.com/prod/displayReport/jmeter-reports/${reportName}/index.html`;
  //   window.location.href = reportUrl;
  // }

  // useEffect(() => {
  //     async function fetchReports() {
  //         try {
  //             const response = await fetch('https://to1zh74r43.execute-api.eu-west-2.amazonaws.com/prod/listReports');
  //             const data = await response.json();
  //             setReports(data);
  //             setLoading(false);
  //             console.log("Reports fetched:", data);
  //         } catch (error) {
  //             console.error("Error fetching reports:", error);
  //             setLoading(false);
  //         }
  //     }

  //     fetchReports();
  // }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
            <h1>JMeter Reports</h1>
            <ul>
                {reports.map((report,index) => (
                  <li key={index} onClick={() => viewReport(report)}>
                      {report}
                  </li>
                ))}
            </ul>
      </div>
  )
}

export default ReportList;