from flask import Flask, render_template, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/launches')
def get_launches():
    version = request.args.get('version', 'v5')
    spacex_url = f'https://api.spacexdata.com/{version}/launches'
    response = requests.get(spacex_url)
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({'error': 'Failed to fetch launches'}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
