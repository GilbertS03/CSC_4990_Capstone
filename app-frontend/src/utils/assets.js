const S3_URL = import.meta.env.VITE_ENV === 'dev'
  ? 'http://localhost:5173/assets'
  : 'https://dvlybc03nsv3j.cloudfront.net/assets';

export const asset = (path) => `${S3_URL}/${path}`;
