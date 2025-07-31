pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // 拉取代码
                checkout main
            }
        }
        stage('Install Dependencies') {
            steps {
                // 安装依赖
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'echo test'
            }
        }
        stage('Start') {
            steps {
                // 启动应用
                bat 'npm start'
            }
        }
    }
}
