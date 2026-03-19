export default function CalloutBox({ text, notionLinks }) {
  return (
    <div className="callout">
      <p>{text}</p>
      <p>
        Las bases de datos completas están en Notion:{' '}
        <a className="callout-link" href={notionLinks.empresas} target="_blank" rel="noreferrer">
          Base de Empresas ↗
        </a>{' '}
        ·{' '}
        <a className="callout-link" href={notionLinks.proyectos} target="_blank" rel="noreferrer">
          Base de Proyectos ↗
        </a>
      </p>
    </div>
  );
}
