const apiMocker = require("connect-api-mocker")

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    before: (app, server, compiler) => {
      app.use(apiMocker("/api/products", "mocks/api/products"));
      app.use(apiMocker("/api/products/1", "mocks/api/products/1"));
      app.use(apiMocker("/api/reviews/product/1", "mocks/api/reviews/product/1"));
      app.use(apiMocker("/api/reviews/1", "mocks/api/reviews/1"));
      app.use(apiMocker("/api/questions/product/1", "mocks/api/questions/product/1"));
      app.use(apiMocker("/api/questions/1", "mocks/api/questions/1"));
    },
  },
}