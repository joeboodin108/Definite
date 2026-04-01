interface GeometricBackgroundProps {
  variant?: "hero" | "light" | "dark";
}

export default function GeometricBackground({
  variant = "hero",
}: GeometricBackgroundProps) {
  const variantStyles: Record<string, string> = {
    hero: "opacity-100",
    light: "opacity-50",
    dark: "opacity-[0.08] mix-blend-overlay",
  };

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${variantStyles[variant]}`}
      aria-hidden="true"
    >
      <div className="shape-wrapper w1"><div className="shape" /></div>
      <div className="shape-wrapper w2"><div className="shape shape-alt-1" /></div>
      <div className="shape-wrapper w3"><div className="shape shape-alt-2" /></div>
      <div className="shape-wrapper w4"><div className="shape" /></div>
      <div className="shape-wrapper w5"><div className="shape shape-alt-3" /></div>
      <div className="shape-wrapper w6"><div className="shape" /></div>
      <div className="shape-wrapper w7"><div className="shape shape-alt-4" /></div>
    </div>
  );
}
