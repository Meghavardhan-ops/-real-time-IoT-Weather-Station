# IoT Weather Station Dashboard

![IoT Weather Station Dashboard](https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)

## Overview

This project is a real-time IoT Weather Station dashboard built with React, TypeScript, and Tailwind CSS. It simulates an IoT system that collects weather data from multiple sensor locations and displays it in a user-friendly interface.

## Features

- **Real-time Weather Data**: Temperature, humidity, pressure, wind speed, rainfall, and UV index
- **Multiple Locations**: Switch between different sensor locations to view localized weather data
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-refresh**: Data automatically updates every minute
- **Weather Status**: Visual representation of current weather conditions
- **Historical Data**: Placeholder for historical data visualization

## Live Demo

Check out the live demo: [IoT Weather Station Dashboard](https://graceful-torte-90608e.netlify.app)

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/iot-weather-station.git
   cd iot-weather-station
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
iot-weather-station/
├── public/
├── src/
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # TypeScript declarations
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Future Enhancements

- Implement actual IoT device integration using MQTT or WebSockets
- Add real-time charts for historical data visualization
- Implement weather forecasting based on collected data
- Add user authentication for private weather stations
- Implement geolocation to automatically select the nearest weather station

## License

MIT
