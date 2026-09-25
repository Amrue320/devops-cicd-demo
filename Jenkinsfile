pipeline {
    agent any

    environment {
        APP_NAME = "devops-cicd-app"
        IMAGE_NAME = "devops-cicd-app"
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing application dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests...'
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                bat """
                    docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                """
            }
        }

        stage('Docker Image Verification') {
            steps {
                bat 'docker images %IMAGE_NAME%'
            }
        }

        stage('Deploy') {
            steps {
                bat """
                    kubectl apply -f deployment.yaml
                    kubectl apply -f service.yaml
                """

                bat """
                    kubectl set image deployment/%APP_NAME% %APP_NAME%=%IMAGE_NAME%:%IMAGE_TAG%
                """
            }
        }

        stage('Rolling Deployment') {
            steps {
                bat """
                    kubectl rollout status deployment/%APP_NAME% --timeout=180s
                """
            }
        }

        stage('Verify') {
            steps {
                bat 'kubectl get deployment'
                bat 'kubectl get pods'
                bat 'kubectl get service'
            }
        }
    }

    post {
        success {
            echo 'CI/CD PIPELINE SUCCESSFUL'
            echo 'Application deployed successfully.'
        }

        failure {
            echo 'CI/CD PIPELINE FAILED'
            echo 'Check Jenkins console output.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
