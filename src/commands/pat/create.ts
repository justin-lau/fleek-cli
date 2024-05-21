import { createClient } from '@fleekxyz/sdk';

import { output } from '../../cli';
import { getPersonalAccessTokenNameOrPrompt } from '../../utils/prompts/getPersonalAccessTokenNameOrPrompt';
import { generateVerificationSessionId } from '../../utils/token/generateVerificationSessionId';
import { showVerificationSessionLink } from '../../utils/token/showVerificationSessionLink';
import { waitForPersonalAccessTokenFromVerificationSession } from '../../utils/token/waitForPersonalAccessTokenFromVerificationSession';
import { t } from '../../utils/translation';

type CreatePersonalAccessTokenActionHandlerArgs = {
  uiAppUrl: string;
  authApiUrl: string;
};

type CreatePersonalAccessTokenOptions = {
  name?: string;
};

export const createPersonalAccessTokenActionHandler =
  ({ uiAppUrl, authApiUrl }: CreatePersonalAccessTokenActionHandlerArgs) =>
  async (options: CreatePersonalAccessTokenOptions) => {
    const verificationSessionId = generateVerificationSessionId();

    const name = await getPersonalAccessTokenNameOrPrompt({
      name: options?.name,
    });
    output.printNewLine();
    showVerificationSessionLink({ output, uiAppUrl, verificationSessionId });

    const personalAccessToken = await waitForPersonalAccessTokenFromVerificationSession({
      verificationSessionId,
      client: createClient({ url: authApiUrl }),
      name,
    });

    if (!personalAccessToken) {
      output.error(t('patFetchTimeout'));

      return;
    }

    output.success(t('newPatIs', { pat: output.textColor(personalAccessToken, 'redBright') }));
  };
