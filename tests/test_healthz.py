from scope.app import create_app


def test_healthz_endpoint():
    app = create_app()
    with app.test_client() as client:
        response = client.get("/healthz")
        assert response.status_code == 200
        assert response.json == {"status": "ok", "app": "scope"}
