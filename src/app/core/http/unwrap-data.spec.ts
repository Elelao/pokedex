import { unwrapData } from '@core/http/unwrap-data';

describe('unwrapData', () => {
  it('unwraps data within given object', () => {
    const dataWithWrappedData = {
      data: {
        foo: 'bar',
      },
    };

    const unwrapped = unwrapData(dataWithWrappedData);

    expect(unwrapped).toEqual(dataWithWrappedData.data);
  });

  it('does nothing if no data property in given object', () => {
    const dataWithoutWrappedData = {
      foo: 'bar',
    };

    const unwrapped = unwrapData(dataWithoutWrappedData);

    expect(unwrapped).toEqual(dataWithoutWrappedData);
  });
});
