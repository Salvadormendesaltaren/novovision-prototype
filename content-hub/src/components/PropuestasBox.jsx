export default function PropuestasBox({ data }) {
  return (
    <div className="propuestas-box">
      <div className="propuestas-label">{data.label}</div>
      <h3 className="propuestas-title">{data.title}</h3>
      <div className="propuestas-body">
        {data.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
