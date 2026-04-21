const S3_URL = import.meta.env.VITE_ENV === 'dev'
  ? 'http://localhost:5173/assets'
  : 'http://myapp-frontend-s3-bucket.s3-website-us-east-1.amazonaws.com';

export const asset = (path) => `${S3_URL}/${path}`;