import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationError(error: ValidationError): Errors {
  const validatationErrors: Errors = {};

  error.inner.forEach(err => {
    validatationErrors[err.path] = err.message;
  });

  return validatationErrors;
}
