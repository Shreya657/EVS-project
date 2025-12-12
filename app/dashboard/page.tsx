"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
// We import CSS here for Leaflet to work
import 'leaflet/dist/leaflet.css';

export default function Dashboard() {
  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState("");

  // --- REFS (For Map & Chart instances) ---
  const mapRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);

  // --- 1. INITIALIZE MAP (Client-Side Only) ---
// --- 1. INITIALIZE MAP (Client-Side Only) ---
  useEffect(() => {
    // Basic check for server-side or missing container
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamic import of Leaflet
    import('leaflet').then((L) => {
      // 🛑 CRITICAL FIX: Check if map is already initialized inside the async block
      if (mapRef.current || (mapContainerRef.current as any)?._leaflet_id) return;

      // Fix for Leaflet icons
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;

      // Initialize Map
      const map = L.map(mapContainerRef.current!).setView([20, 0], 2);
      mapRef.current = map;

      // Dark Matter Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Click Handler
      map.on('click', (e: any) => {
        handleMapClick(e.latlng.lat, e.latlng.lng, L);
      });
    });

    // Cleanup function
    return () => {
        // We only remove the map if the ref exists
        if(mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []);

  // --- 2. HANDLE MAP CLICK ---
  const handleMapClick = async (lat: number, lng: number, L: any) => {
    setLoading(true);
    setCoords({ lat, lng });

    // Remove existing markers
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.CircleMarker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Add Cyan Halo Marker
    L.circleMarker([lat, lng], {
      color: '#22d3ee', // Cyan
      weight: 2,
      fillColor: '#06b6d4',
      fillOpacity: 0.8,
      radius: 8
    }).addTo(mapRef.current);

    // Fetch Data
    await fetchWeatherData(lat, lng);
    setLoading(false);
  };

  // --- 3. FETCH WEATHER API ---
  const fetchWeatherData = async (lat: number, lng: number) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability&timezone=auto&forecast_days=1`;
      const res = await fetch(url);
      const data = await res.json();
      
      setWeatherData(data);
      updateChart(data.hourly);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  // --- 4. UPDATE CHART.JS ---
  const updateChart = async (hourly: any) => {
    const Chart = (await import('chart.js/auto')).default;
    
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = chartCanvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Create Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
    gradient.addColorStop(1, 'rgba(34, 211, 238, 0.0)');

    // Slice next 24 hours
    const labels = hourly.time.slice(0, 24).map((t: string) => new Date(t).getHours() + ":00");
    const temps = hourly.temperature_2m.slice(0, 24);

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temp (°C)',
          data: temps,
          borderColor: '#22d3ee',
          backgroundColor: gradient,
          borderWidth: 2,
          pointBackgroundColor: '#020617',
          pointBorderColor: '#22d3ee',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#64748b' } },
          y: { grid: { color: '#1e293b' }, ticks: { color: '#64748b' } }
        }
      }
    });
  };

  // --- HELPER: Get Weather Icon ---
  const getWeatherLabel = (code: number) => {
    const codes: any = { 0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast", 45: "Fog", 51: "Drizzle", 61: "Rain", 71: "Snow", 95: "Thunderstorm" };
    return codes[code] || "Unknown";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-6 font-mono relative overflow-hidden">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[100px] pointer-events-none rounded-full"></div>

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-white/10 z-10 relative">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wider flex items-center gap-3">
            HELIOS <span className="text-cyan-400">TRACK</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">PLANETARY METEOROLOGICAL GRID | {currentTime}</p>
        </div>
        <Link href="/" className="mt-4 md:mt-0 px-4 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs transition z-20">
          Exit Dashboard
        </Link>
      </header>

      {/* --- MAIN LAYOUT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* --- LEFT COL: MAP (5 Cols) --- */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0f172a] p-1 rounded-xl border border-white/10 shadow-2xl relative">
            <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur px-3 py-1 rounded text-xs text-cyan-400 border border-cyan-500/30">
               {loading ? "SCANNING..." : "TARGET ACQUISITION MODE"}
            </div>
            
            {/* MAP CONTAINER */}
            <div 
              ref={mapContainerRef} 
              className="h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden z-0" 
              style={{ background: '#020617' }} // Prevent white flash
            ></div>

            {/* Coordinates Overlay */}
            <div className="bg-[#020617] p-4 rounded-b-lg border-t border-white/10 flex justify-between items-center text-xs">
               <div className="text-slate-400">LAT: <span className="text-white">{coords.lat.toFixed(4)}</span></div>
               <div className="text-slate-400">LNG: <span className="text-white">{coords.lng.toFixed(4)}</span></div>
               <div className="text-cyan-500 animate-pulse">{loading ? "UPLINKING" : "CONNECTED"}</div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COL: DATA (7 Cols) --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">

            {!weatherData ? (
                // EMPTY STATE
                <div className="h-full flex flex-col items-center justify-center bg-[#0f172a]/50 border border-dashed border-slate-700 rounded-xl">
                    <div className="text-6xl mb-4 opacity-20">📡</div>
                    <h3 className="text-xl text-slate-300">No Signal Detected</h3>
                    <p className="text-slate-500 text-sm">Select a location on the map to initialize data stream.</p>
                </div>
            ) : (
                // ACTIVE DATA DASHBOARD
                <>
                    {/* Top Row Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#0f172a] border border-white/10 p-5 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">🌡</div>
                            <p className="text-slate-400 text-xs uppercase">Temperature</p>
                            <div className="text-3xl font-bold text-white mt-1">{Math.round(weatherData.current.temperature_2m)}°C</div>
                            <div className="text-xs text-slate-500 mt-2">Feels like {Math.round(weatherData.current.apparent_temperature)}°</div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/10 p-5 rounded-xl">
                            <p className="text-slate-400 text-xs uppercase">Conditions</p>
                            <div className="text-xl font-bold text-cyan-400 mt-2 truncate">
                                {getWeatherLabel(weatherData.current.weather_code)}
                            </div>
                            <div className="text-xs text-slate-500 mt-2">Wind: {weatherData.current.wind_speed_10m} km/h</div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/10 p-5 rounded-xl">
                            <p className="text-slate-400 text-xs uppercase">Humidity</p>
                            <div className="text-3xl font-bold text-white mt-1">{weatherData.current.relative_humidity_2m}%</div>
                            <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{width: `${weatherData.current.relative_humidity_2m}%`}}></div>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/10 p-5 rounded-xl">
                            <p className="text-slate-400 text-xs uppercase">Precipitation</p>
                            <div className="text-3xl font-bold text-white mt-1">{weatherData.current.precipitation}</div>
                            <span className="text-xs text-slate-500">mm (Current)</span>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-[#0f172a] border border-white/10 p-6 rounded-xl shadow-lg flex-grow flex flex-col">
                        <h3 className="text-sm font-bold text-slate-300 mb-4 flex justify-between items-center">
                            <span>24-Hour Thermal Projection</span>
                            <span className="text-xs font-normal text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">LIVE DATA</span>
                        </h3>
                        <div className="relative w-full flex-grow min-h-[250px]">
                             <canvas ref={chartCanvasRef}></canvas>
                        </div>
                    </div>

                    {/* Helios System Status (Your Hardware Mockup) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0f172a]/50 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <div className="text-xs text-slate-500">SYSTEM VOLTAGE</div>
                                <div className="text-xl font-bold text-white">14.2 V</div>
                            </div>
                            <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_10px_lime]"></div>
                        </div>
                        <div className="bg-[#0f172a]/50 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                             <div>
                                <div className="text-xs text-slate-500">EFFICIENCY GAIN</div>
                                <div className="text-xl font-bold text-cyan-400">+37.5%</div>
                            </div>
                            <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
}