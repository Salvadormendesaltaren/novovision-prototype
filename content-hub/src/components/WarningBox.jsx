export default function WarningBox({ items }) {
  return (
    <div className="warning-box">
      <div className="warning-label">Limitaciones del análisis</div>
      {items.map((item) => (
        <p key={item.title}>
          <strong>{item.title}.</strong> {item.body}
        </p>
      ))}
    </div>
  );
}
