import { useEffect, useState } from "react";

export default function Home() {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSalesReps() {
      try {
        const response = await fetch("http://localhost:8000/api/sales-reps");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setSalesReps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSalesReps();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="title">Sales Representatives</h1>
      <ul className="sales-reps-list">
        {salesReps.map((rep) => (
          <li className="sales-rep" key={rep.id}>
            <h2 className="rep-header">
              {rep.name} - {rep.role} ({rep.region})
            </h2>
            <p><strong>Skills:</strong> {rep.skills.join(", ")}</p>
            <p><strong>Deals:</strong></p>
            <ul>
              {rep.deals.map((deal, index) => (
                <li key={index}>
                  Client: {deal.client}, Value: ${deal.value}, Status: {deal.status}
                </li>
              ))}
            </ul>
            <p><strong>Clients:</strong></p>
            <ul>
              {rep.clients.map((client, index) => (
                <li key={index}>
                  {client.name} (Industry: {client.industry}, Contact: {client.contact})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
