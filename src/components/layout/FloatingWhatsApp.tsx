"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/962795919919";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after a brief delay for a polished entrance
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`
        fixed bottom-6 end-6 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366] text-white
        shadow-lg shadow-[#25D366]/30
        transition-all duration-500
        hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40
        active:scale-95
        ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
      `}
    >
      <MessageCircle className="h-6 w-6" fill="white" strokeWidth={0} />
      {/* Pulse ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30" />
    </a>
  );
}
