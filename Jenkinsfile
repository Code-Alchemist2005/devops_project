pipeline {
    agent any

    environment {
        IMAGE_NAME = 'employee-mgmt-app'
        CONTAINER_NAME = 'employee-mgmt-container'
        APP_PORT = '3000'
    }

    stages {

        stage('📥 Clone Repository') {
            steps {
                echo '>>> Cloning code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/Code-Alchemist2005/devops_project.git'
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo '>>> Installing Node.js dependencies...'
                sh 'npm install --production'
            }
        }

        stage('🐳 Build Docker Image') {
            steps {
                echo '>>> Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:latest ."
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('🛑 Stop Old Container') {
            steps {
                echo '>>> Removing old container if running...'
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
            }
        }

        stage('🚀 Deploy New Container') {
            steps {
                echo '>>> Deploying new container...'
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:latest
                """
            }
        }

        stage('✅ Health Check') {
            steps {
                echo '>>> Verifying app is running...'
                sh 'sleep 15'
                sh "curl -f http://localhost:${APP_PORT} || exit 1"
                echo '>>> App is live!'
            }
        }

        stage('🧹 Cleanup Old Images') {
            steps {
                echo '>>> Removing dangling Docker images...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo """
            ✅ ====================================
               DEPLOYMENT SUCCESSFUL
               App running at: http://localhost:3000
               Build #${BUILD_NUMBER}
            ====================================
            """
        }
        failure {
            echo """
            ❌ ====================================
               BUILD FAILED — Check logs above
               Build #${BUILD_NUMBER}
            ====================================
            """
        }
    }
}
