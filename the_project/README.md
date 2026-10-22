# ToDo App

## Deployment

Deploy to Kubernetes with:
```bash
kubectl apply -R -f manifests/
```

## Endpoints

- `GET /` - Page for viewing and adding new todos.
- `GET /todos` - List all todos.
- `POST /todos` - Create a new todo.
