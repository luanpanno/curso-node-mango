export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/login-params',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account',
            },
          },
        },
      },
    },
  },
};
