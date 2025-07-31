pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // 拉取代码
                bat 'git checkout main'
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
                powershell 'Start-Process npm -ArgumentList "start" -PassThru | Set-Content server.pid'
            }
        }
        stage('Stop Server') {
            steps {
                powershell '$pid = Get-Content server.pid | Select-Object -ExpandProperty Id; Stop-Process -Id $pid'
                }
        }
    }
}
