import { Response } from 'express';

export const handleServerError = (res: Response, error: unknown) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

export const validateRequestBody = (body: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !body[field]);
  if (missingFields.length > 0) {
    return `Missing fields: ${missingFields.join(', ')}`;
  }
  return null;
};