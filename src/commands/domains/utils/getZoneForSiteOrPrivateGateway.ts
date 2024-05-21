import { FleekSdk, PrivateGateway, Site, Zone } from '@fleekxyz/sdk';

import { waitForZoneCreationResult } from '../wait/waitForZoneCreationResult';

export type GetZoneForSiteOrPrivateGatewayArgs = {
  sdk: FleekSdk;
} & (
  | { site: Pick<Site, 'id' | 'zones'> }
  | {
      privateGateway: Pick<PrivateGateway, 'zone'>;
    }
);

export const getZoneForSiteOrPrivateGateway = async (args: GetZoneForSiteOrPrivateGatewayArgs): Promise<Pick<Zone, 'id'> | null> => {
  if ('privateGateway' in args) {
    return args.privateGateway.zone!;
  }

  const existingZones = args.site.zones?.filter((zone) => zone.status === 'CREATED');

  if (existingZones?.[0]?.id) {
    return existingZones[0];
  }

  const zone = await args.sdk.domains().createZoneForSite({ siteId: args.site.id });

  const zoneCreationResult = await waitForZoneCreationResult({ sdk: args.sdk, zone });

  if (zoneCreationResult !== 'CREATED') {
    return null;
  }

  return zone;
};