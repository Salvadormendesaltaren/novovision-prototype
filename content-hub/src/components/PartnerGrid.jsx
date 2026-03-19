export default function PartnerGrid({ partners }) {
  return (
    <div className="partner-grid">
      {partners.map((partner) => (
        <article className="partner-card" key={partner.name}>
          <h3 className="partner-name">{partner.name}</h3>
          <p className="partner-desc">{partner.desc}</p>
          <div className="partner-pipeline-label">Pipeline actual</div>
          {partner.pipeline.map((item) => (
            <div className="partner-pipeline-item" key={`${partner.name}-${item.company}`}>
              {item.company}
              <span className={`pill ${item.status === 'done' ? 'pill-done' : 'pill-pending'}`}>{item.note}</span>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}
