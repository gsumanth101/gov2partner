export default function SplineScene() {
  return (
    <div className="spline-scene" aria-hidden="true">
      <div className="stage-grid" />
      <div className="axis-ring ring-a" />
      <div className="axis-ring ring-b" />
      <div className="core-stack">
        <div className="core-layer layer-top" />
        <div className="core-layer layer-mid" />
        <div className="core-layer layer-base" />
      </div>
      <div className="data-panel data-a">
        <span />
        <span />
        <span />
      </div>
      <div className="data-panel data-b">
        <span />
        <span />
      </div>
      <div className="floating-chip chip-a">AI</div>
      <div className="floating-chip chip-b">SPACE</div>
      <div className="floating-chip chip-c">SECURE</div>
    </div>
  )
}
