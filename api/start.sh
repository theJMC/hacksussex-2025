docker stop hs25-app
docker build -t hs25 .
docker run -d --rm --name hs25-app --env-file ./.env -p 52001:3001 hs25