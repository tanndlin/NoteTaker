pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('GITHUB_TOKEN')
        DOCKER_VOLS = '-v jenkins_jenkins_home:/var/jenkins_home -v npm-cache:/root/.npm'
        NODE_IMAGE = 'node:22'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh '''
                curl -L \
                -X POST \
                -H "Accept: application/vnd.github+json" \
                -H "Authorization: Bearer $GITHUB_TOKEN" \
                -H "X-GitHub-Api-Version: 2022-11-28" \
                https://api.github.com/repos/tanndlin/NoteTaker/statuses/$GIT_COMMIT \
                -d '{"state":"pending","description":"Build in progress","context":"Jenkins"}'
                '''
            }
        }

        // Firebase Hosting later serves frontend/build directly (see firebase.json),
        // so this is the artifact a real deploy would ship.
        stage('Install & Build Frontend') {
            steps {
                sh '''
                docker run --rm $DOCKER_VOLS -w $WORKSPACE/frontend $NODE_IMAGE \
                    sh -c "npm ci && npm run build"
                '''
            }
        }

        stage('Install & Build Server') {
            steps {
                sh '''
                docker run --rm $DOCKER_VOLS -w $WORKSPACE/server $NODE_IMAGE \
                    sh -c "npm ci && npm run build"
                '''
            }
        }

        stage('Lint') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh '''
                    docker run --rm $DOCKER_VOLS -w $WORKSPACE/frontend $NODE_IMAGE \
                        sh -c "npm run lint"
                    '''
                }
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh '''
                    docker run --rm $DOCKER_VOLS -w $WORKSPACE/server $NODE_IMAGE \
                        sh -c "npm run lint"
                    '''
                }
            }
        }

        stage('Format Check') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh '''
                    docker run --rm $DOCKER_VOLS -w $WORKSPACE/frontend $NODE_IMAGE \
                        sh -c "npm run format:check"
                    '''
                }
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh '''
                    docker run --rm $DOCKER_VOLS -w $WORKSPACE/server $NODE_IMAGE \
                        sh -c "npm run format:check"
                    '''
                }
            }
        }

        // Non-blocking: the frontend has vitest wired up but no test files yet,
        // and the server has no test runner at all. Flip to a blocking stage
        // once real tests exist.
        stage('Test') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh '''
                    docker run --rm $DOCKER_VOLS -w $WORKSPACE/frontend $NODE_IMAGE \
                        sh -c "npm test"
                    '''
                }
            }
        }
    }

    post {
        success {
            sh '''
            curl -L \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $GITHUB_TOKEN" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/tanndlin/NoteTaker/statuses/$GIT_COMMIT \
            -d '{"state":"success","description":"Build succeeded","context":"Jenkins"}'
            '''
        }
        failure {
            sh '''
            curl -L \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $GITHUB_TOKEN" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/tanndlin/NoteTaker/statuses/$GIT_COMMIT \
            -d '{"state":"failure","description":"Build failed","context":"Jenkins"}'
            '''
        }
    }
}
