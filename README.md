# Weather Comparison App

A modern web application to compare weather conditions between cities, view current weather, and see temperature trends with interactive charts.

## Features

- **City Search:** Quickly search and select cities to compare their weather.
- **Current Weather:** View real-time weather details for selected cities.
- **7-Day Forecast:** See a week-long weather forecast for each city.
- **Temperature Chart:** Visualize temperature trends with interactive charts.
- **Responsive UI:** Clean, mobile-friendly design using React, Tailwind CSS, and shadcn-ui components.

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started

### Prerequisites
- Node.js & npm ([Download](https://nodejs.org/))

### Installation

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Deployment

### Deploy to Netlify
1. Push your code to GitHub.
2. Go to [Netlify](https://app.netlify.com/) and create a new site from Git.
3. Connect your GitHub repo and set the build command to `npm run build` and publish directory to `dist`.
4. After deployment, your site will be live at `https://your-site-name.netlify.app`.

#### Netlify Badge
[![Netlify Status](https://api.netlify.com/api/v1/badges/7056528a-012d-4524-bba3-06d17516e4bc/deploy-status)](https://app.netlify.com/projects/weatherappfrontendonly/deploys)


## Custom Domain

You can add a custom domain in your Netlify site settings after deployment.

## Credits
- Weather data powered by [OpenWeatherMap](https://openweathermap.org/)
- UI components by [shadcn-ui](https://ui.shadcn.com/)

---

Feel free to contribute or open issues for suggestions and bug reports!
