# end-to-end_CICD_pipeline
# Docker CI/CD Pipeline with Jenkins

## Overview

This project demonstrates a simple **CI/CD pipeline** using **Jenkins** and **Docker**. Whenever code is pushed to GitHub, Jenkins automatically pulls the latest code, builds a Docker image, and deploys the application inside a Docker container.

## Architecture

```
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins
    │
    ├── Clone Repository
    ├── Build Docker Image
    ├── Stop Old Container
    ├── Run New Container
    │
    ▼
Docker Container
    │
    ▼
Application Running
```

---

## Technologies Used

- Jenkins
- Docker
- Git & GitHub
- Ubuntu (AWS EC2)
- Linux
- CI/CD Pipeline

---

## Prerequisites

Before running this project, ensure you have:

- Ubuntu Server
- Docker installed
- Jenkins installed
- Git installed
- Java installed
- GitHub repository containing your application
- Port opened in Security Group (e.g., 8080 or your application port)

---

# Installation

## Step 1: Update System

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Step 2: Install Git

```bash
sudo apt install git -y
```

Verify installation

```bash
git --version
```

---

## Step 3: Install Docker

```bash
sudo apt install docker.io -y
```

Enable Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Check version

```bash
docker --version
```

---

## Step 4: Give Docker Permission

```bash
sudo usermod -aG docker ubuntu
sudo usermod -aG docker jenkins
```

Restart

```bash
sudo systemctl restart docker
sudo systemctl restart jenkins
```

---

## Step 5: Install Jenkins

Install Java

```bash
sudo apt install fontconfig openjdk-21-jre -y
```

Download Jenkins key

```bash
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
```

Add repository

```bash
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
```

Install Jenkins

```bash
sudo apt update
sudo apt install jenkins -y
```

Start Jenkins

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

---

## Step 6: Unlock Jenkins

Get password

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Open

```
http://YOUR_PUBLIC_IP:8080
```

Install Suggested Plugins.

Create an admin account.

---

# Create Jenkins Pipeline

Click

```
New Item
```

Choose

```
Pipeline
```

Save.

---

## Configure GitHub Repository

Repository URL

```
https://github.com/your-username/your-repository.git
```

---

## Add Pipeline Script

```groovy
pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-username/your-repository.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f myapp || true'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d --name myapp -p 8000:8000 myapp'
            }
        }

    }
}
```

---

# Build Pipeline

Click

```
Build Now
```

Watch build logs

```
Console Output
```

---

# Verify Docker

Images

```bash
docker images
```

Containers

```bash
docker ps
```

Logs

```bash
docker logs myapp
```

---

# Verify Application

Open

```
http://YOUR_PUBLIC_IP:8000
```

---

# Folder Structure

```
project/
│
├── Dockerfile
├── Jenkinsfile
├── package.json
├── app.js
├── src/
└── README.md
```

---

# Useful Docker Commands

Build image

```bash
docker build -t myapp .
```

Run container

```bash
docker run -d -p 8000:8000 myapp
```

Stop container

```bash
docker stop myapp
```

Remove container

```bash
docker rm myapp
```

Remove image

```bash
docker rmi myapp
```

View running containers

```bash
docker ps
```

View all containers

```bash
docker ps -a
```

View images

```bash
docker images
```

---

# CI/CD Workflow

1. Developer pushes code to GitHub.
2. Jenkins fetches the latest code.
3. Jenkins builds a Docker image.
4. Existing container is stopped and removed.
5. A new container is created using the latest image.
6. Updated application is deployed automatically.

---

# Future Improvements

- Integrate GitHub Webhooks
- Push Docker images to Docker Hub
- Deploy on Kubernetes
- Add automated testing stage
- Integrate SonarQube for code quality
- Deploy using AWS ECS or EKS

---

# Author

**Shravni Bhadale**

Cloud & DevOps Enthusiast

---

## License

This project is for learning and educational purposes.
