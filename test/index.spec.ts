import { DefaultError } from '../src';

const debugData = {};

describe('Test custom error class', function () {
  it('Error must have "data" field with "debugData"', async function () {
    const e = 'Test error';
    const result = new DefaultError(e, {
      meta: { debugData },
    });

    expect(result.data).toMatchObject(debugData);
  });

  it('Error must have "status" field', async function () {
    const e = 'Access is denied';
    const result = new DefaultError(e, {
      status: 403,
    });

    expect(result.status).toBe(403);
  });
});
