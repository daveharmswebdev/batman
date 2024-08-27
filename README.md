### Docker DB I am using

```
docker run --name batman-db -e POSTGRES_PASSWORD=1mb@tman! -d -p 5432:5432 postgres
```

### Redis

```
docker run --name batman-redis -p 6379:6379 -d redis
```