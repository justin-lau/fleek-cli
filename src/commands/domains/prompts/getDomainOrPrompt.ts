import { DomainsNotFoundError } from '@fleekxyz/errors';
import { Domain, FleekSdk } from '@fleekxyz/sdk';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetDomainOrPromptArgs = {
  id?: string;
  hostname?: string;
  sdk: FleekSdk;
  choicesFilter?: (domain: Domain) => boolean;
};

export const getDomainOrPrompt = async ({ id, hostname, sdk, choicesFilter }: GetDomainOrPromptArgs): Promise<Domain> => {
  if (id) {
    return sdk.domains().get({ domainId: id });
  }

  if (hostname) {
    return sdk.domains().getByHostname({ hostname });
  }

  const allDomains = await sdk.domains().list();

  const domains = choicesFilter ? allDomains.filter(choicesFilter) : allDomains;

  if (!domains.length) {
    throw new DomainsNotFoundError();
  }

  const selectedDomainId = await selectPrompt({
    message: `${t('selectDomain')}:`,
    choices: domains.map((domain) => ({ title: domain.hostname, value: domain.id })),
  });

  return domains.find((domain) => domain.id === selectedDomainId)!;
};
