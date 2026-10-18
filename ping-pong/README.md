# Ping-Pong App

## Deployment

Deploy to Kubernetes with:
```bash
kubectl apply -f manifests/
```

## Endpoints

- `GET /pingpong` - Responds with `pong <count>` and increments the counter.
- `GET /pongs` - Responds with current counter value as `Ping / Pongs: <count>`.
