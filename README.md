# RAASTAGO — Complete Road Information

A submission-ready, framework-free frontend prototype built with **HTML, CSS and JavaScript**.

## Pages
- `index.html` — Home + route search + map
- `find-route.html` — Route planner + map
- `route-results.html` — Route comparison + map
- `live-traffic.html` — Pakistan traffic overview + map
- `reports.html` — Community reports + report map
- `report.html` — Report problem + selectable map location
- `safety-guide.html` — Road safety guide
- `about.html` — Product information + map coverage
- `login.html` — Login/Register demonstration
- `dashboard.html` — User traffic dashboard + map

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript
- Leaflet map library
- OpenStreetMap map tiles

The map uses Leaflet/OpenStreetMap when an internet connection is available. A built-in visual fallback is included so the map area never remains blank if the external map library cannot load.

## Run
Open `index.html` in a browser, or use **VS Code → Live Server** for the best experience.

## Demo limitations
Traffic numbers, incidents and route results are clearly labelled as demonstration data. No API key, password, database credential or private secret is included.

Community reports submitted from the report form are stored in browser `localStorage` for demonstration purposes.

## Submission note
This project is a frontend prototype. A future version can connect a backend, live traffic provider and production directions/geocoding APIs.
