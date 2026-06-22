export default function Navbar() {
    return (
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="font-bold text-emerald-400">
            செலவுக் காவலன்
          </h1>
  
          <div className="flex gap-4">
            <button className="text-sm">
              Login
            </button>
  
            <button className="rounded-lg bg-emerald-500 px-4 py-2 text-black">
              Register
            </button>
          </div>
        </div>
      </header>
    );
  }