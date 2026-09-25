pipeline {

    agent any

    environment {
        APP_NAME   = "devops-cicd-app"
        IMAGE_NAME = "devops-cicd-app"
        IMAGE_TAG  = "v${BUILD_NUMBER}"

        KUBECONFIG = "C:\\ProgramData\\Jenkins\\.kube\\config"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '========================================'
                echo 'CHECKOUT SOURCE CODE'
                echo '========================================'

                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo '========================================'
                echo 'BUILD APPLICATION'
                echo '========================================'

                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '========================================'
                echo 'TEST APPLICATION'
                echo '========================================'

                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                echo '========================================'
                echo 'BUILD DOCKER IMAGE'
                echo '========================================'

                bat """
                    docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                """

                echo "Docker image created: ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Docker Image Verification') {
            steps {
                echo '========================================'
                echo 'DOCKER IMAGE VERIFICATION'
                echo '========================================'

                bat 'docker images %IMAGE_NAME%'
            }
        }

        stage('Kubernetes Connection Test') {
            steps {
                echo '========================================'
                echo 'KUBERNETES CONNECTION TEST'
                echo '========================================'

                bat 'kubectl config current-context'

                bat 'kubectl get nodes'
            }
        }

        stage('Deploy Kubernetes Resources') {
            steps {
                echo '========================================'
                echo 'DEPLOY KUBERNETES RESOURCES'
                echo '========================================'

                bat 'kubectl apply -f deployment.yaml'

                bat 'kubectl apply -f service.yaml'
            }
        }

        stage('Update Application Image') {
            steps {
                echo '========================================'
                echo 'UPDATE APPLICATION IMAGE'
                echo '========================================'

                bat """
                    kubectl set image deployment/%APP_NAME% %APP_NAME%=%IMAGE_NAME%:%IMAGE_TAG%
                """
            }
        }

        stage('Rolling Deployment') {
            steps {
                echo '========================================'
                echo 'ROLLING DEPLOYMENT'
                echo '========================================'

                bat """
                    kubectl rollout status deployment/%APP_NAME% --timeout=180s
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '========================================'
                echo 'VERIFY DEPLOYMENT'
                echo '========================================'

                bat 'kubectl get deployment'

                bat 'kubectl get pods'

                bat 'kubectl get service'

                bat 'kubectl rollout status deployment/%APP_NAME%'
            }
        }
    }

    post {

        success {
            echo '========================================'
            echo 'CI/CD PIPELINE SUCCESSFUL'
            echo '========================================'

            echo "Application: ${APP_NAME}"

            echo "Docker Image: ${IMAGE_NAME}:${IMAGE_TAG}"

            echo 'Kubernetes deployment completed successfully.'
        }

        failure {
            echo '========================================'
            echo 'CI/CD PIPELINE FAILED'
            echo '========================================'

            echo 'Check the Jenkins console output.'
        }

        always {
            echo '========================================'
            echo 'PIPELINE EXECUTION COMPLETED'
            echo '========================================'
        }
    }
}
