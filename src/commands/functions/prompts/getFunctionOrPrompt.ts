import { FleekFunctionsNotFoundError } from '@fleekxyz/errors';
import { FleekFunction, FleekSdk } from '@fleekxyz/sdk';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetFunctionOrPromptArgs = {
  name?: string;
  sdk: FleekSdk;
};

export const getFunctionOrPrompt = async ({ name, sdk }: GetFunctionOrPromptArgs): Promise<FleekFunction> => {
  if (name) {
    return sdk.functions().get({ name });
  }

  const functions = await sdk.functions().list();

  if (!functions.length) {
    throw new FleekFunctionsNotFoundError({});
  }

  const selectedFunctionId = await selectPrompt({
    message: t('commonSelectXFromList', { subject: t('function') }),
    choices: functions.map((f) => ({ title: f.name, value: f.id })),
  });

  return functions.find((f) => f.id === selectedFunctionId)!;
};