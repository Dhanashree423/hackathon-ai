const FloatingDecor = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-left blob */}
      <span
        className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-accent/40 blur-2xl opacity-50 animate-pulse"
      />
      {/* Top-right small circle */}
      <span
        className="absolute top-12 right-8 h-6 w-6 rounded-full bg-warning/40 opacity-60 animate-[float_6s_ease-in-out_infinite]"
      />
      {/* Center-left circle */}
      <span
        className="absolute top-1/3 left-6 h-8 w-8 rounded-full bg-success/40 opacity-50 animate-[float_7s_ease-in-out_infinite_alternate]"
      />
      {/* Bottom-right blob */}
      <span
        className="absolute -bottom-12 -right-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl opacity-50 animate-pulse"
      />
      {/* Bottom-left tiny dot */}
      <span
        className="absolute bottom-10 left-12 h-3 w-3 rounded-full bg-primary/60 opacity-70 animate-[float_5s_ease-in-out_infinite]"
      />
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default FloatingDecor;
