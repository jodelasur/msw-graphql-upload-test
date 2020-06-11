import { graphql, setupWorker } from 'msw';

// Configure mocking routes
const worker = setupWorker(
  graphql.query('GetUserDetail', (req, res, ctx) => {
    return res(
      ctx.data({
        user: {
          firstName: 'John',
          lastName: 'Maverick',
        },
      }),
    );
  }),
  graphql.mutation('Logout', (req, res, ctx) => {
    return res(
      ctx.errors([
        {
          message: 'This is a mocked error!',
          locations: [
            {
              line: 1,
              column: 2,
            },
          ],
        },
      ]),
    );
  }),
);

worker.start();
