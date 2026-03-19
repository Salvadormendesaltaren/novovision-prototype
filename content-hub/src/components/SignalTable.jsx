export default function SignalTable({ rows }) {
  return (
    <div className="signal-table-wrap">
      <table className="signal-table">
        <thead>
          <tr>
            <th>Arquetipo</th>
            <th>Señales monitorizadas</th>
            <th>Canal sugerido</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.archetype}>
              <td data-label="Arquetipo">{row.archetype}</td>
              <td data-label="Señales monitorizadas">{row.signals}</td>
              <td data-label="Canal sugerido">{row.channel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
