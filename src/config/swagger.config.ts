import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Opika API',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/models/*.ts', './src/**/*.controller.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
