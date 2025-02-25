/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default () => ({
  app: {
    port: Number.parseInt(process.env.PORT, 10) || 8080,
  },
  database: {
    secret: String(process.env.FAUNADB_SECRET),
    region: String(process.env.FAUNADB_REGION),
  },
});
