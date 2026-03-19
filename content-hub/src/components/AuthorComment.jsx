const icons = [
  <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="4" width="14" height="12" rx="2.5" /><path d="M6 8h8M6 11h8" /></svg>,
  <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="6" y="2.5" width="8" height="15" rx="1.8" /><circle cx="10" cy="14.2" r="0.9" /><path d="M8 5.5h4" /></svg>,
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M10 4v12" /><circle cx="10" cy="10" r="7" /></svg>,
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h5l1.6 2.2 2.1-4.4 1.7 2.2h2.6" /><rect x="2.5" y="3" width="15" height="14" rx="2.5" /></svg>
];

export default function AuthorComment({ data }) {
  return (
    <div className="author-comment">
      <div className="author-comment-label">Comentario del autor</div>
      <div className="author-comment-body">
        {data.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="author-process-grid" role="list" aria-label="Proceso de construcción">
        {data.process.map((item, index) => (
          <div className="author-process-item" role="listitem" key={item}>
            <span className="author-process-icon">{icons[index] || icons[0]}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="author-signature">{data.signature}</div>
    </div>
  );
}
