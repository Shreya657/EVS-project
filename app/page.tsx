import Link from 'next/link';

export default function Home() {
  return (
    // MAIN CONTAINER: Continuous PPT Gradient
    <main className="min-h-screen bg-gradient-to-b from-[#02426c] via-[#011c38] to-[#00031d] text-white selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-[#00031d]/60 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-bold tracking-wider text-cyan-300 flex items-center gap-2">
          <span className="text-2xl">☀</span> HELIOS TRACK
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#problem" className="hover:text-white transition">The Problem</a>
          <a href="#technology" className="hover:text-white transition">Technology</a>
          <a href="#team" className="hover:text-white transition">Team</a>
        </div>
        <Link href="/dashboard" className="bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          Launch Demo
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <h4 className="text-cyan-400 font-bold tracking-[0.2em] mb-4 text-sm animate-pulse">
          NEXT-GEN PHOTOVOLTAIC OPTIMIZATION
        </h4>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-2xl">
          Don't Let the Sun <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">
            Pass You By.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          Static panels lose 40% of potential energy due to misalignment. <br className="hidden md:block" />
          Our <strong>Dynamic Dual-Axis Tracker</strong> follows the light, maximizing every ray.
        </p>

        <div className="flex flex-col md:flex-row gap-5 z-10">
          <Link href="/dashboard" className="px-8 py-4 bg-cyan-500 text-[#00031d] font-bold rounded-lg hover:bg-cyan-400 transition shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            See Live Data
          </Link>
          <a href="#problem" className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition">
            Why It Matters
          </a>
        </div>

        {/* Floating Stats Strip */}
        <div className="absolute bottom-10 left-0 w-full hidden md:flex justify-center gap-16 text-slate-400 text-sm tracking-widest uppercase opacity-70">
          <div>Avg Gain: <span className="text-white font-bold">37.5%</span></div>
          <div>Morning Boost: <span className="text-white font-bold">52%</span></div>
          <div>Tracking: <span className="text-white font-bold">Active</span></div>
        </div>
      </section>

      {/* --- THE PROBLEM (Cosine Loss) --- */}
      <section id="problem" className="py-24 bg-[#00031d]/50 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The "Cosine Loss" Problem</h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              Fixed solar panels are only perfectly aligned with the sun for about <strong>2 hours a day</strong>. For the other 80% of the time, sunlight hits at an angle, reflecting energy away instead of absorbing it.
            </p>
            <ul className="space-y-4">
              {[
                "Lost Morning/Evening Potential",
                "Inefficient Seasonal Angles",
                "Wasted Surface Area"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <span className="text-red-500 text-xl">✖</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: The NEW Animation */}
          {/* --- PASTE STARTED HERE --- */}
          <div className="relative h-80 w-full bg-[#0b1120] rounded-xl border border-white/10 overflow-hidden flex flex-col items-center justify-end shadow-inner">
            
            {/* Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] to-[#1e293b] opacity-50"></div>
            
            {/* Sun Path (Arc) */}
            <div className="absolute bottom-0 w-[90%] h-[90%] border-t border-l border-r border-white/5 rounded-t-full pointer-events-none"></div>

            {/* Sun Animation Wrapper */}
            <div className="absolute bottom-[-20px] left-1/2 w-[350px] h-[350px] -ml-[175px] origin-center animate-[spin_8s_linear_infinite]">
              {/* Sun */}
              <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 bg-yellow-400 rounded-full shadow-[0_0_30px_rgba(250,204,21,0.6)] z-20">
                {/* Sun Beam */}
                <div className="absolute top-1/2 left-1/2 w-[200px] h-[40px] bg-gradient-to-r from-yellow-400/30 to-transparent -translate-y-1/2 origin-left rotate-90 blur-xl"></div>
              </div>
            </div>

            {/* The Panel */}
            <div className="relative z-10 mb-8 flex flex-col items-center">
              {/* Reflection Arrows */}
              <div className="absolute -top-12 flex w-full justify-between opacity-0 animate-[pulse_8s_ease-in-out_infinite]">
                 <span className="text-red-500 text-xs font-bold -rotate-45">Reflected! ↗</span>
              </div>

              {/* Panel Body */}
              <div className="w-40 h-2 bg-slate-600 rounded-full relative overflow-hidden group">
                {/* Power Glow (Timed to hit when sun is top) */}
                <div className="absolute inset-0 bg-cyan-400 opacity-0 animate-[ping_8s_linear_infinite] delay-[3.8s]"></div>
              </div>
              
              {/* Stand */}
              <div className="w-2 h-12 bg-slate-700"></div>
              <div className="w-12 h-2 bg-slate-700 rounded-t-lg"></div>

              <p className="mt-4 text-xs text-slate-500 font-mono">Fixed Angle = 80% Loss</p>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 text-[10px] text-slate-600 uppercase tracking-widest">East (Sunrise)</div>
            <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 uppercase tracking-widest">West (Sunset)</div>
          </div>
          {/* --- PASTE ENDED HERE --- */}

        </div>
      </section>

      {/* --- HOW IT WORKS (Methodology) --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Intelligent Automation</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our system mimics nature (heliotropism) using a simple 3-step loop.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition duration-300">
              <div className="text-5xl mb-4 opacity-50">01</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Detection</h3>
              <p className="text-slate-400 text-sm">
                LDR sensors placed on East/West axis continuously compare light intensity levels (Lux).
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition duration-300">
              <div className="text-5xl mb-4 opacity-50">02</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Computation</h3>
              <p className="text-slate-400 text-sm">
                The Arduino/ESP32 controller calculates the delta. If the difference exceeds the threshold, it triggers a move.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition duration-300">
              <div className="text-5xl mb-4 opacity-50">03</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Actuation</h3>
              <p className="text-slate-400 text-sm">
                High-torque servo motors rotate the panel precisely to the angle of maximum irradiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECH SPECS (Grid) --- */}
      <section id="technology" className="py-24 bg-[#011c38]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Under the Hood</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Controller", val: "ESP32 / Arduino" },
              { label: "Actuators", val: "MG995 Servo Motors" },
              { label: "Sensors", val: "LDR (Photoresistors)" },
              { label: "Tracking", val: "Dual-Axis" },
              { label: "Power Source", val: "Solar + 12V DC" },
              { label: "Material", val: "Aluminum Frame" },
              { label: "Connection", val: "IoT Enabled" },
              { label: "Feedback", val: "Real-time Loops" },
            ].map((spec, i) => (
              <div key={i} className="bg-[#00031d] border border-white/10 p-6 rounded-lg text-center hover:border-cyan-500/30 transition">
                <div className="text-slate-500 text-xs uppercase mb-2">{spec.label}</div>
                <div className="text-white font-bold">{spec.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section id="team" className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Built by Future Engineers</h2>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {[
            "Shreya Bera", "Priyasmita Das", "Samriddha Banerjee", 
            "Shreyasi Bhunia", "Sounak Biswas", "Sambit Das", 
            "Suman Ghosh", "Aritra Sen", "Soumyajit Mondal", "Soumik Dey"
          ].map((name, i) => (
            <span key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-cyan-900/20 hover:text-cyan-400 hover:border-cyan-500/50 transition cursor-default">
              {name}
            </span>
          ))}
        </div>
        <p className="mt-12 text-slate-500 text-sm">
          Techno India University | B.Tech CSE 2025 Capstone Project
        </p>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#00031d] border-t border-white/5 py-12 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Optimize?</h2>
          <Link href="/dashboard" className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold hover:scale-105 transition shadow-lg">
            Launch Simulation Dashboard
          </Link>
          <p className="mt-8 text-xs text-slate-600">
            &copy; 2025 Helios Track. All rights reserved. Data based on simulation models.
          </p>
        </div>
      </footer>

    </main>
  );
}