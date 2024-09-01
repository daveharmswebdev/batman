### Docker DB I am using

```
docker run --name batman-db -e POSTGRES_PASSWORD=1mb@tman! -d -p 5432:5432 postgres
```

### Redis

```
docker run --name batman-redis -p 6379:6379 -d redis
```

### GKE

```kubernetes helm
gcloud container clusters create batman-dev-cluster --num-nodes=3 --zone=us-central1-a
```

```kubernetes helm
gcloud container clusters get-credentials batman-dev-cluster --zone=us-central1-a
```

### Creating and running prisma migrations
```javascript
npx dotenv -e .env.development -- npx prisma migrate dev --name initial
```
