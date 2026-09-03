import type {
  CreateInterviewKitInput,
  BatchInterviewKitInput,
} from './input.types';

const MIN_DAYS = 1;
const MAX_DAYS = 60;

const MAX_JD_LENGTH = 50_000;

export function validateCreateInterviewKitInput(
  input: CreateInterviewKitInput,
): void {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid interview kit input.');
  }

  if (
    typeof input.jd !== 'string' ||
    input.jd.trim().length === 0
  ) {
    throw new Error('Job description is required.');
  }

  if (input.jd.length > MAX_JD_LENGTH) {
    throw new Error(
      `Job description must not exceed ${MAX_JD_LENGTH} characters.`,
    );
  }

  if (
    typeof input.company_url !== 'string' ||
    input.company_url.trim().length === 0
  ) {
    throw new Error('Company URL is required.');
  }

  validateDays(input.days);
}

export function validateBatchInterviewKitInput(
  input: BatchInterviewKitInput,
): void {
  if (
    !input ||
    typeof input !== 'object' ||
    typeof input.id !== 'string' ||
    input.id.trim().length === 0
  ) {
    throw new Error('Batch case id is required.');
  }

  validateCreateInterviewKitInput(input);
}

function validateDays(days: number): void {
  if (
    typeof days !== 'number' ||
    !Number.isInteger(days)
  ) {
    throw new Error('Days must be an integer.');
  }

  if (days < MIN_DAYS || days > MAX_DAYS) {
    throw new Error(
      `Days must be between ${MIN_DAYS} and ${MAX_DAYS}.`,
    );
  }
}