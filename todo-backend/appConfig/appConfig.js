let appConfig = {}

appConfig.port = '3000'
appConfig.env = 'dev'
appConfig.allowedOrigin= "*"
appConfig.db = {
    uri: "mongodb://127.0.0.1:27017/toDoListDB"
}
appConfig.apiVersion = "/api/v1"
appConfig.name = "Sanjay C"
appConfig.url = "http://localhost:4200"
appConfig.email = "sanjayinfotechy@gmail.com"
appConfig.password = "SanjaySan@27"

module.exports = {
    port: appConfig.port,
    env: appConfig.env,
    allowedOrigin: appConfig.allowedOrigin,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}