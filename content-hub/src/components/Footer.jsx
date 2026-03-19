export default function Footer({ footer }) {
  return (
    <footer className="doc-footer">
      <div className="footer-brand">{footer.brand}</div>
      <div className="footer-info">{footer.info}</div>
    </footer>
  );
}
