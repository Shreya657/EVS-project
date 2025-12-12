
# ☀ Helios Track - Dynamic Solar Tracking Visualization

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%20%7C%20Tailwind%20%7C%20Leaflet-blue)

**Helios Track** is a modern web interface designed to simulate and visualize the performance of a **Dual-Axis Solar Tracking System**. 

Built as a companion to our B.Tech Capstone Project, this application demonstrates how dynamic tracking technology can increase solar energy efficiency by **37.5%** compared to static panels. It features a live telemetry dashboard that integrates real-world weather data to simulate hardware performance in different environmental conditions.

---

## 🚀 Key Features

### 🌍 **Geospatial Intelligence**
- **Interactive Map:** Integrated **Leaflet.js** map allowing users to select any global coordinate.
- **Real-Time Weather:** Fetches live atmospheric data (Temperature, Wind Speed, Humidity, Precipitation) using the **Open-Meteo API**.
- **Dark Matter UI:** Custom-styled map tiles to match the application's "Deep Space" aesthetic.

### 📊 **Advanced Analytics Dashboard**
- **Live Telemetry Simulation:** Simulates hardware sensor feeds (LDR Lux levels, LM35 Temperature, Voltage Output).
- **Efficiency Comparison:** Visualizes the "Cosine Loss" reduction, showing the real-time efficiency gap between Fixed vs. Tracking panels.
- **Dynamic Charts:** Powered by **Chart.js** to display 24-hour thermal projections and efficiency trends.

### 🎨 **Next-Gen UI/UX**
- **Glassmorphism Design:** Built with **Tailwind CSS**, featuring frosted glass panels, neon glows, and gradient borders.
- **Responsive Animations:** Includes a custom "Sun Path" animation explaining the solar tracking concept visually.
- **Strict Mode Safe:** Optimized for Next.js 15+ with dynamic imports for client-side mapping libraries.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (React)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Mapping:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
* **Charts:** [Chart.js](https://www.chartjs.org/)
* **Data Source:** [Open-Meteo API](https://open-meteo.com/) (No API Key Required)
* **Icons:** CSS-based animations & Unicode

---

## 📸 Screenshots

| Landing Page | Analytics Dashboard |
|:---:|:---:|
| *(Add your Landing Page Screenshot here)* | *(Add your Dashboard Screenshot here)* |

> *The interface features a custom "Helios Navy" gradient (`#020617` to `#00031d`) derived from the project's original technical presentation.*

---

## ⚡ Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/your-username/helios-track.git](https://github.com/your-username/helios-track.git)
    cd helios-track
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # Install specific type definitions for the map
    npm install -D @types/leaflet
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:3000` to view the application.

---

## 📂 Project Structure

```bash
helios-track/
├── app/
│   ├── layout.tsx       # Global layout & fonts
│   ├── page.tsx         # Landing Page (Marketing & Concept)
│   └── dashboard/
│       └── page.tsx     # The Main Simulation App (Map + Charts)
├── public/              # Static assets
└── tailwind.config.ts   # Custom theme configuration
