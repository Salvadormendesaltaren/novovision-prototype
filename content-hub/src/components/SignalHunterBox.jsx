export default function SignalHunterBox({ signalHunter }) {
  return (
    <div className="signal-hunter-box">
      <div className="signal-hunter-label">{signalHunter.label}</div>
      <h3 className="signal-hunter-title">{signalHunter.title}</h3>
      <div className="signal-hunter-body">
        {signalHunter.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {signalHunter.examples.map((example) => (
          <div className="signal-example" key={example.label}>
            <div className="signal-example-label">{example.label}</div>
            <div className="signal-example-body">{example.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
