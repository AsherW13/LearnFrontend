from flask import Flask, render_template, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/launches')
def get_launches():
    spacex_url = 'https://api.spacexdata.com/v5/launches'
    response = requests.get(spacex_url)
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({'error': 'Failed to fetch latest launches'}), 500

if __name__ == '__main__':
    app.run(debug=True)