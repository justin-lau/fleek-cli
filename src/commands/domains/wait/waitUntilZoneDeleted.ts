import { FleekSdk, Zone } from '@fleekxyz/sdk';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitUntilZoneDeletedArgs = {
  sdk: FleekSdk;
  zone: Pick<Zone, 'id'>;
};

export const waitUntilZoneDeleted = async ({ zone, sdk }: WaitUntilZoneDeletedArgs): Promise<boolean> => {
  return checkPeriodicallyUntil({
    conditionFn: async () =>
      sdk
        .domains()
        .getZone({ id: zone.id })
        .then(() => false)
        .catch(() => true),
    period: 6_000,
    tries: 10,
  });
};
