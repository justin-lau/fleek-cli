import { EnsRecord, FleekSdk } from '@fleekxyz/sdk';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitUntilEnsRecordDeletedArgs = {
  ensRecord: Pick<EnsRecord, 'id'>;
  sdk: FleekSdk;
};

export const waitUntilEnsRecordDeleted = async ({ ensRecord, sdk }: WaitUntilEnsRecordDeletedArgs): Promise<boolean> => {
  return checkPeriodicallyUntil({
    conditionFn: async () =>
      sdk
        .ens()
        .get({ id: ensRecord.id })
        .then(() => false)
        .catch(() => true),
    period: 6_000,
    tries: 10,
  });
};
