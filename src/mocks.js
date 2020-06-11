import { rest, setupWorker } from 'msw';

// Configure mocking routes
const worker = setupWorker(
  rest.get(
    'https://api.github.com/repos/:owner/:repo',
    (req, res, ctx) => {
      const { owner, repo } = req.params;
      
      return res(
        // Set custom status
        ctx.status(200),
        
        //  Set headers
        ctx.set({ 'X-Header': 'Mocked value' }),
        
        //  Delay the response
        ctx.delay(1000),
        
        // send JSON response body
        ctx.json({
          name: 'mocked-name',
          owner,
          repo,
        }),
      );
    },
  ),
);

worker.start();
