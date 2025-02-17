/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedQuery } from 'query-string';

export const parseQueryObject = <T extends Record<string, any>>(
  parsedQuery: ParsedQuery
): T => {
  return Object.keys(parsedQuery).reduce((result, key) => {
    const value = parsedQuery[key];

    if (Array.isArray(value)) {
      result[key] = value.map((v) => (isNaN(Number(v)) ? v : Number(v))); // Convert array elements to numbers if possible
    } else if (typeof value === 'string') {
      if (value === 'true' || value === 'false') {
        result[key] = value === 'true'; // Convert to boolean
      } else if (!isNaN(Number(value))) {
        result[key] = Number(value); // Convert to number
      } else {
        result[key] = value; // Keep as string
      }
    } else {
      result[key] = value; // Keep other types
    }

    return result;
  }, {} as Record<string, any>) as T;
};
