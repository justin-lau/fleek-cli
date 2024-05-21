import { FleekFunctionStatusNotValidError } from '@fleekxyz/errors';
import { FleekFunctionStatus } from '@fleekxyz/sdk';
import { isFunctionStatusValid } from '@fleekxyz/utils-validation';

type GetFunctionStatusOrPromptArgs = {
  status?: string;
};

export const getFunctionStatusOrPrompt = async ({ status }: GetFunctionStatusOrPromptArgs): Promise<FleekFunctionStatus> => {
  if (status && isFunctionStatusValid({ status })) {
    return status as FleekFunctionStatus;
  }

  throw new FleekFunctionStatusNotValidError({});
};
