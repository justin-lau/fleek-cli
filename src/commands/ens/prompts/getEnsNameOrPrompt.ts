import { EnsNameInvalidError } from '@fleekxyz/errors';
import { isEnsValid } from '@fleekxyz/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetEnsNameOrPromptArgs = {
  name?: string;
};

export const getEnsNameOrPrompt = async ({ name }: GetEnsNameOrPromptArgs) => {
  if (name) {
    if (isEnsValid({ name })) {
      return name;
    }

    throw new EnsNameInvalidError({ ensRecord: { name } });
  }

  return textPrompt({
    message: `${t('ensEnterName')}:`,
    validate: (partialEns) => isEnsValid({ name: partialEns }) || t('ensIncorrectForm'),
  });
};
