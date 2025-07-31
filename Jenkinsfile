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
                // 如果有测试脚本可以加上，没有可以跳过
                // sh 'npm test'
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