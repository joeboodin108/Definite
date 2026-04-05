"use client";

import { useEffect, useRef, useState } from "react";

type Animation = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const animationStyles: Record<Animation, { from: React.CSSProperties; to: React.CSSProperties }> = {
  "fade-up": {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "slide-left": {
    from: { opacity: 0, transform: "translateX(40px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "slide-right": {
    from: { opacity: 0, transform: "translateX(-40px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-in": {
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
};

// Shared observer pool — one observer per unique threshold value
const observerMap = new Map<number, IntersectionObserver>();
const callbackMap = new Map<Element, (isIntersecting: boolean) => void>();

function getSharedObserver(threshold: number): IntersectionObserver {
  let observer = observerMap.get(threshold);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = callbackMap.get(entry.target);
          if (cb && entry.isIntersecting) {
            cb(true);
            observer!.unobserve(entry.target);
            callbackMap.delete(entry.target);
          }
        }
      },
      { threshold }
    );
    observerMap.set(threshold, observer);
  }
  return observer;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver(threshold);
    callbackMap.set(el, () => setIsVisible(true));
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbackMap.delete(el);
    };
  }, [threshold]);

  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...styles.from,
        ...(isVisible ? styles.to : {}),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
