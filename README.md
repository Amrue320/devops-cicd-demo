# DevOps CI/CD Demo

This project demonstrates:

GitHub → Jenkins → Build → Test → Docker → Kubernetes → Rolling Deployment → Verify → Rollback

## Requirements

Install:

- Git
- Node.js 18+
- Docker Desktop
- Jenkins
- kubectl
- Minikube

## Project files

- `server.js` - demo web application
- `test.js` - automated application test
- `package.json` - Node.js configuration
- `Dockerfile` - Docker image definition
- `.dockerignore` - Docker build exclusions
- `Jenkinsfile` - Jenkins CI/CD pipeline
- `deployment.yaml` - Kubernetes Deployment with 3 replicas and RollingUpdate
- `service.yaml` - Kubernetes NodePort Service

## 1. Run locally

```powershell
npm install
npm test
npm start
```

Open:

```text
http://localhost:3000
```

## 2. Build Docker image

```powershell
docker build -t devops-cicd-app:v1 .
docker run -d --name devops-cicd-app-v1 -p 3000:3000 devops-cicd-app:v1
```

Open:

```text
http://localhost:3000
```

Stop and remove:

```powershell
docker stop devops-cicd-app-v1
docker rm devops-cicd-app-v1
```

## 3. Start Minikube

```powershell
minikube start --driver=docker
kubectl get nodes
```

Load image:

```powershell
minikube image load devops-cicd-app:v1
```

Deploy:

```powershell
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Check:

```powershell
kubectl get deployment
kubectl get pods
kubectl get service
```

Open:

```powershell
minikube service devops-cicd-service
```

## 4. GitHub

Create a GitHub repository and push all project files:

```powershell
git init
git add .
git commit -m "Add CI/CD demo"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 5. Jenkins

Create a Jenkins Pipeline job.

Select:

```text
Pipeline script from SCM
SCM: Git
Branch: */main
Script Path: Jenkinsfile
```

Add your GitHub repository URL.

Then click **Build Now**.

The pipeline performs:

1. Checkout
2. Build
3. Test
4. Docker Build
5. Docker Image Verification
6. Deploy
7. Rolling Deployment
8. Verify

## 6. Version 2 / rolling deployment

Build the second version:

```powershell
docker build -t devops-cicd-app:v2 .
minikube image load devops-cicd-app:v2
```

Deploy:

```powershell
kubectl set image deployment/devops-cicd-app devops-cicd-app=devops-cicd-app:v2
```

Watch:

```powershell
kubectl get pods -w
```

Verify:

```powershell
kubectl rollout status deployment/devops-cicd-app
kubectl get pods
```

## 7. Controlled deployment failure

Deploy an intentionally nonexistent image:

```powershell
kubectl set image deployment/devops-cicd-app devops-cicd-app=devops-cicd-app:bad-version
```

Check:

```powershell
kubectl get pods
```

You should see `ImagePullBackOff` or `ErrImagePull` for the failed new pod.

Check rollout:

```powershell
kubectl rollout status deployment/devops-cicd-app
```

Press `Ctrl+C` if it waits for the failed rollout.

## 8. Rollback

View history:

```powershell
kubectl rollout history deployment/devops-cicd-app
```

Rollback:

```powershell
kubectl rollout undo deployment/devops-cicd-app
```

Verify:

```powershell
kubectl rollout status deployment/devops-cicd-app
kubectl get deployment
kubectl get pods
```

The previous working version should be restored.

## Required submission screenshots

1. Jenkins CI/CD Pipeline Screenshot
2. Deployment / Rolling Deployment Screenshot
3. Docker Image Screenshot
4. Successful Application Screenshot
5. Controlled Failure Screenshot
6. Rollback Screenshot
7. Pipeline Architecture Diagram

## Architecture

```text
GitHub
   |
   v
Jenkins
   |
   +--> Build
   |
   +--> Test
   |
   +--> Docker Build
   |
   v
Docker Image
   |
   v
Kubernetes Deployment
   |
   v
3 Replicas
   |
   v
Rolling Update
   |
   v
Verify
   |
   v
Controlled Failure
   |
   v
Rollback
   |
   v
Previous Working Version
```
