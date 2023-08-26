import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Transfer Management API',
            version: '1.0.0',
            description: 'API documentation for Transfer Management Applications.',
        },
    },
    apis: ['src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
