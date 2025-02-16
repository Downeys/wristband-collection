# Wristband Radio Music Player

## Application Summary

The Wristband Radio app is a streaming music player that showcases music from local artists. The app has streaming-radio, on-demand streaming, a music submission form, contact form, and an about page. Please check out the live application at [wristbandradio.com](https://wristbandradio.com)

I'm creating this project for many reasons. First of all, it has been a lifelong dream of mine to create this kind of app for myself and my fellow local musicians, so it's definitely a passion project for me. Beyond that though, I want to have a public example of my full stack development skills to act as a portfolio while I search for a better developer job. Futhermore, I just like to code. I enjoy making projects in my spare time, and it helps me grow my programming skills.

## Project Summary

The wristband-collection project is the only active frontend for the Wristband Radio application. It's a web app available in the browser at the url listed above, but it's not available in any app stores yet. There is a separate repo where the react-native version of this frontend is currently under development.

This project utilizes the howlerjs library and audio files stored in the cloud to stream local music to the user. The radio functionality includes a randomized playlist, next button, pause button, and seek bar, but it only serves one song at a time. The catelog page provides on demand streaming functionality for all songs on the app. It includes an alphabetized list of songs, play button, next button, back button, seek bar, and shuffle button. There is a submit page that allows users to submit songs to us, so we can consider them for inclusion on the app. There's also a contact form where users can submit feedback or questions. The music submission and contact form functionality is currently housed in the backend of this NextJs project, but is being transitioned to the file-server project where it will also support the mobile native versio of the app. Finally, there is also an about page. This page is meant to be used as a marketing tool to funnel local music submissions to us. All features are internationalized and currently support English and Spanish locales.

## Project Setup

There are multiple ways to setup the project, depending on your needs/goals. You can run this api alone and test it with postman or swagger. If you just want to take a look at the application and prove that this code works, then I reccommend spinning it up using docker alone. If you're interested in debugging or playing around with the api code, then I would recommend spinning up the frontend in docker and running this project from the console. You can also clone both project repos and run them both locally from the console if you're interested in debugging or playing around in the fronend code as well. Please don't hesitate to reach out to me through the [contact form](https://wristbandradio.com/contact) or at the email address listed on my resume.

**Prerequisites for project setup:** VsCode, Docker, Node 20.11.1, npm 10.2.4

I have made my current dev environment public to make it easier for potential employers to test my project. This does not expose any resources or secrets used in production. In fact, even this dev environment will be replaced by a completely separate/segregated dev environment in the future, and this environment will be reserved solely for public portfolio projects.

**Important note:** The missing value in the env file can be found by decoding this using a base64 decoder: TDZVOFF+cG9tMl8zLk5CUUZydDZMLWZ0M0RqT0tWcnFnTy5KRWFmNA==

### Run the full application in docker

**clone the repo:**

git clone https://github.com/Downeys/wristband-collection.git

**run the docker compose:**

docker compose up -d

### Run local frontend with docker backend

**clone the repo:**

git clone https://github.com/Downeys/wristband-collection.git

**install the packages:**

npm ci

**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'.

**run the backend:**

docker compose -f docker-compose.backend.yml up -d

**run the frontend:**

npm run dev

### Run backend and frontend from local console

**clone the backend repo:**

git clone https://github.com/Downeys/wristband-file-server.git

**install the packages:**

npm ci

**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'.

**run the backend:**

npm start

**clone the frontend repo:**

git clone https://github.com/Downeys/wristband-collection.git

**install the packages:**

npm ci

**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'. It's the same value for both projects.

**run the frontend:**

npm run dev

## Observability

This project utilizes Otel, Prometheus, Loki, Zipkin, and Grafana to collect and visualize logs, metrics, and traces. This is an initial setup which still has a lot of room for improvement, but it allows immediate insights into the project.

### View Logs

After spinning up the application using the steps described above, you will be able to use Grafana to check the logs of both frontend and backend apps.

1. Navigate to localhost:3001
2. Click 'Data sources' in the left navigation panel under 'Connections'
3. Click 'Add Data Source' button
4. Select Loki
5. On the next screen, in the Connection tab, 'URL' should be automatically selected from the dropdown. Use 'http://loki:3100' as the value.
6. Click 'Save & test' at the very bottom
7. Next, click 'Dashboards' in the left navigation panel
8. Click the '+ Create Dashboard' button
9. Click the '+ Add Visualization' button and select Loki

... This is where it gets complicated. Would be easier if you're familiar with Grafana. Will do my best to enumerate the steps below though.

10. Just below the 'Save dashboard' button on the right, there's a dropdown. Click it, scroll down, and select 'Logs'
11. In the bottom middle pane, you should see the 'Queries' tab selected automatically
12. Under that tab, find the label filters section. In the left dropdown select 'Sevice' and in the right dropdown select 'node-backend'
13. Click the blue 'Run query' button
14. Click the blue 'Save dashboard' button
15. Enter a title you'll remember like backend-logs
16. Repeat steps 11-15 but select 'next-frontend' service name in step 12 and give it a title like frontend-logs.

### View Metrics

After spinning up the application using the steps described above, you will be able to use Grafana to check the metrics of both frontend and backend apps.

1. Navigate to localhost:3001
2. Click 'Data sources' in the left navigation panel under 'Connections'
3. Click 'Add Data Source' button
4. Select Prometheus
5. On the next screen, in the Connection tab, 'URL' should be automatically selected from the dropdown. Use 'http://prometheus:9090' as the value.
6. Click 'Save & test' at the very bottom
7. Next, click 'Dashboards' in the left navigation panel
8. Click the '+ Create Dashboard' button
9. Click the 'Import Dashboard' button in the bottom right
10. Enter '11159' and click the blue 'Load' button
11. Provide the dashboard with a name you'll remember like backend-metrics.
12. At the bottom, select Prometheus in the dropdown labled 'prometheus'
13. Click the blue 'Import' button at the bottom

### View Traces

After spinning up the application using the steps described above, you will be able to use Zipkin to check the traces of both frontend and backend apps.

1. Navigate to localhost:9411
2. Click the red '+' button
3. Select 'Service' filter and the service you want to trace.

NOTE: Tracing is only working for the frontend app when it is run locally from the console. Still dialing in the networking between frontend/otel/zipkin when using docker compose up option.
