export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        {/* Floating decorative cards */}
        <div className="absolute top-1/4 left-1/4 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 rotate-[-8deg] shadow-2xl" />
        <div className="absolute top-1/3 left-1/3 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 rotate-[4deg] shadow-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 rotate-[6deg] shadow-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-white font-bold text-xl">TaskFlow</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight">
              Manage tasks with{' '}
              <span className="text-yellow-300">clarity and speed</span>
            </h2>
            <p className="text-white/70 mt-3 text-base leading-relaxed">
              TaskFlow helps teams and individuals stay on top of their work with smart organization, real-time collaboration, and beautiful design.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '✅', label: 'Smart task organization' },
              { icon: '🎯', label: 'Priority management' },
              { icon: '📅', label: 'Due date tracking' },
              { icon: '🌙', label: 'Beautiful dark mode' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 bg-white/10 rounded-xl p-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-white/90 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['#f472b6', '#60a5fa', '#34d399', '#fbbf24'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white/30"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="text-white/70 text-sm">
            <span className="text-white font-semibold">2,400+</span> productive teams
          </p>
        </div>
      </div>

      {/* Right panel - auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
