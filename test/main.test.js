import {
  prepWebpack,
  deleteWebpackOutput,
  assertSpecificErrors,
  assertNoErrors,
  handleCatch,
} from './helpers';

describe('stylelint-custom-processor', () => {
  afterAll(deleteWebpackOutput);

  it('finds errors', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/invalid.js'
    );
    const expectedErrorsRegex = /color-named[\s\S]*?max-empty-lines[\s\S]*?declaration-empty-line-before/;
    webpackInstance
      .run()
      .then(assertSpecificErrors(expectedErrorsRegex))
      .then(done)
      .catch(handleCatch);
  });

  it('handles correct file', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/valid.js'
    );
    webpackInstance.run().then(assertNoErrors).then(done).catch(handleCatch);
  });
});
