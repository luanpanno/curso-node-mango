export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:8000/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'T8bAS@Lno1==',
};
