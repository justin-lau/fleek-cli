import { isSiteNameValid } from '@fleekxyz/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

export const enterSiteNamePrompt = async (): Promise<string> =>
  textPrompt({
    message: `${t('typeNewSiteName')}:`,
    validate: (partialName: string) => isSiteNameValid({ name: partialName }) || t('invalidNameUseAlphDashes'),
  });
