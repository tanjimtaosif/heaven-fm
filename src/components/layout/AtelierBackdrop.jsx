export const AtelierBackdrop = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fbf9f6_13%,#f4efe7_33%,#f0eae1_57%,#f2ece4_80%,#faf8f5_100%)]" />

      <div className="absolute inset-x-0 top-0 h-[110vh] bg-[radial-gradient(120%_100%_at_50%_-20%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0)_65%)]" />

      <div className="bg-atelier-rules absolute inset-0 [mask-image:linear-gradient(180deg,transparent_0%,#000_9%,#000_86%,transparent_100%)] opacity-50" />

      <div className="animate-aurora absolute top-[-10vh] right-[8%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(196,159,102,0.20)_0%,rgba(196,159,102,0.08)_42%,transparent_70%)]" />

      <div
        className="animate-aurora absolute top-[58vh] left-[-6%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(23,44,48,0.08)_0%,rgba(23,44,48,0.03)_42%,transparent_70%)]"
        style={{ animationDelay: '-9s' }}
      />

      <div
        className="animate-aurora absolute right-[-4%] bottom-[14vh] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(196,159,102,0.15)_0%,rgba(196,159,102,0.05)_45%,transparent_70%)]"
        style={{ animationDelay: '-14s' }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,26,23,0.055)_0%,transparent_13%,transparent_87%,rgba(31,26,23,0.055)_100%)]" />

      <div className="bg-grain absolute inset-0 opacity-[0.045] mix-blend-multiply" />
    </div>
  )
}
