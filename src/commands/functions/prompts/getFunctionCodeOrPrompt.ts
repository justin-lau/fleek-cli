import { FleekFunctionFilePathNotValidError } from '@fleek-platform/errors';
import { isFunctionFilePathValid } from '@fleek-platform/utils-validation';
import { FileLike, filesFromPaths } from 'files-from-path';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetFunctionCodeOrPromptArgs = {
  filePath?: string;
};

export const getFunctionCodeOrPrompt = async ({ filePath }: GetFunctionCodeOrPromptArgs): Promise<FileLike> => {
  if (filePath && (await isFunctionFilePathValid({ filePath }))) {
    const files = await filesFromPaths([filePath]);

    if (!files.length) {
      throw new FleekFunctionFilePathNotValidError({ filePath });
    }

    return files[0];
  }

  if (filePath && !(await isFunctionFilePathValid({ filePath }))) {
    throw new FleekFunctionFilePathNotValidError({ filePath });
  }

  const f = await textPrompt({
    message: 'Enter the file path to the function code:',
    validate: (filePath) => isFunctionFilePathValid({ filePath }) || t('filePathValidWarning'),
  });

  const files = await filesFromPaths([f]);

  if (!files.length) {
    throw new FleekFunctionFilePathNotValidError({ filePath: f });
  }

  return files[0];
};
