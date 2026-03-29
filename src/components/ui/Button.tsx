import { Link } from "@/lib/navigation";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "gold";
  size?: "default" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center gap-2 rounded-full
    font-semibold uppercase tracking-[0.08em] transition-all duration-300
    hover:-translate-y-[1px] active:translate-y-0
  `;

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    gold: "bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20",
  };

  const sizes = {
    default: "px-6 py-2.5 text-[0.8rem]",
    lg: "px-8 py-3.5 text-[0.85rem]",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
