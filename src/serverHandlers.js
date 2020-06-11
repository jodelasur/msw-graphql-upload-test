import { graphql } from 'msw';

const handlers = [
  graphql.query('Build', (req, res, ctx) => {
    return res(
      ctx.data({
        build: {
          id: 1,
          fileSet: false,
          __typename: 'BuildType',
        },
      }),
    );
  }),
  graphql.mutation('SetBuildFile', (req, res, ctx) => {
    return res(
      ctx.data({
        SetBuildFile: {
          build: {
            id: 1,
            fileSet: true,
            __typename: 'BuildType',
          },
          __typename: 'SetBuildFileMutation',
        },
      }),
    );
  }),
];

export { handlers };
