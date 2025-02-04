export const config = {
  inputStream: {
    type: 'LiveStream',
    constraints: {
      width: { min: 450 },
      height: { min: 300 },
      facingMode: 'environment',
      aspectRatio: { min: 1, max: 2 }
    }
  },
  locator: {
    patchSize: 'medium',
    halfSample: true
  },
  numOfWorkers: 2,
  frequency: 10,
  decoder: {
    readers: ['ean_reader']
  },
  locate: true
};
