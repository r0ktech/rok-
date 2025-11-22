"use client";

export function BootScreen() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Boot content */}
      <div className="text-center relative z-10">
        <div className="text-7xl mb-8 boot-pulse">🪟</div>
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Portfolio OS
        </h1>
        <p className="text-xl text-blue-200 mb-8 font-light">
          Loading my digital workspace...
        </p>

        {/* Loading bar */}
        <div className="w-64 h-2 bg-blue-900/50 rounded-full overflow-hidden border border-blue-400/30 mb-6">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"
            style={{ width: "75%" }}
          />
        </div>

        {/* Loader dots */}
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
