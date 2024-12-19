// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrapData(rawResponse: any) {
  return 'data' in rawResponse ? rawResponse.data : rawResponse;
}
