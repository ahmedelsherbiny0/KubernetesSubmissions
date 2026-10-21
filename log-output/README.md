# Log Output App

## Deployment

Deploy to Kubernetes with:
```bash
kubectl apply -f manifests/
```

## Endpoints

- `GET /` 
  - Displays the ConfigMap file content (`information.txt`)
  - Environment variable `MESSAGE`
  - The current timestamp hash
  - The ping/pong count from `ping-pong-svc`.
