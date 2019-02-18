# Flask + React Starter

Simple starter for Flask and React base apps.

## How does it work

`npm` is used to build both the backend (Python 3/Flask) and frontend (React/Javascript) code, specifically:

* `.requirements.txt` where Python dependencies are managed
* `.start.sh` runs Pip against the `.requirements.txt` if needed before starting Flask app&mdash;called from `npm start`
* `package.json` where Javascript dependencies are managed
* `webpack.config.js` config for webpack to build frontend React part
* after frontend React part is built, it is dumped into `dist/` folder for Flask backend to pick up

This configuration was necessary to avoid conflicts between (e.g, npm vs start.sh).



\ ゜o゜)ノ
