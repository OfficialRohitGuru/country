import { useEffect, useState } from "react";

const CountryCards = ({ name, flagImg, flagAlt }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        borderRadius: "8px",
        width: "200px",
        height: "200px",
      }}
    >
      <img src={flagImg} alt={flagAlt} style={{ height: "100px", width: "100px" }} />
      <h2>{name}</h2>
    </div>
  );
};

export default function Countries() {
  const API = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (countries.length === 0) {
    return <div>No countries available</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {countries.map((country) => (
        <CountryCards
          key={country.cca3}  // Add a unique key for each country
          name={country.name.common}
          flagImg={country.flags.png}
          flagAlt={country.flags.alt || `Flag of ${country.name.common}`}
        />
      ))}
    </div>
  );
}
