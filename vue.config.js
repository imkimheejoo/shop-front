const apiMocker = require("connect-api-mocker")

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    before: (app, server, compiler) => {
      app.use(apiMocker("/api/products", "mocks/api/products"))
    },
  },
}