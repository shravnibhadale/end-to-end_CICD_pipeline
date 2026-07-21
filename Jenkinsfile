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
