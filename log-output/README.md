# Log Output App

## Deployment

Deploy to Kubernetes with:
```bash
kubectl apply -f manifests/
```

## Endpoints

- `GET /` - Displays the current timestamp hash and ping/pong count from `ping-pong-svc`.
