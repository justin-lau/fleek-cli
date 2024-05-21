import { getIpnsGatewayUrl } from '@fleekxyz/utils-ipns';

import { output } from '../../cli';
import { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getHashOrPrompt } from './prompts/getHashOrPrompt';
import { getRecordOrPrompt } from './prompts/getRecordOrPrompt';

type PublishActionArgs = {
  name?: string;
  hash: string;
};

const publishAction: SdkGuardedFunction<PublishActionArgs> = async ({ sdk, args }) => {
  const record = await getRecordOrPrompt({ sdk, name: args.name });

  const hash = await getHashOrPrompt({ hash: args.hash });

  await sdk.ipns().publishRecord({ id: record.id, hash });

  output.printNewLine();
  output.log(t('ipnsVisitPublishedIPNSGw') + ':');
  output.link(getIpnsGatewayUrl(record.name));
  output.printNewLine();
  output.hint(t('ipnsPropagationTimeWarn'));
};

export const publishActionHandler = withGuards(publishAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});