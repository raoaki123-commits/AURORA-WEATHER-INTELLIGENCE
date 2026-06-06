const WeatherMap = ({ lat, lon }) => {
  if (!lat || !lon) return null;

  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=10&output=embed`;

  return (
    <div className="card">
      <h3>🗺 Location Intelligence</h3>

      <iframe
        title="Weather Location"
        src={mapUrl}
        width="100%"
        height="400"
        style={{
          border: "none",
          borderRadius: "12px",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

export default WeatherMap;