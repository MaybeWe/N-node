export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      type: process.env.DB_type,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_synchronize,
      entities: [process.env.DB_entities],
      autoLoadEntities: true,
      logging: process.env.DB_logging,
    }
  });