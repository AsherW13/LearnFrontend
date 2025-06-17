import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_route(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b"Ship Launch Viewer" in response.data 

def test_api_launches_route(client):
    response = client.get('/api/launches')
    assert response.status_code == 200
    assert response.is_json
    launches = response.get_json()
    assert isinstance(launches, list)
    assert 'name' in launches[0]  
