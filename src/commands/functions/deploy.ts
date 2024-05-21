import cliProgress from 'cli-progress';

import { output } from '../../cli';
import { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getFunctionCodeOrPrompt } from './prompts/getFunctionCodeOrPrompt';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';

type DeployActionArgs = {
  filePath?: string;
  name?: string;
};

const uploadOnProgress = (progressBar: cliProgress.SingleBar) => {
  return ({ loadedSize, totalSize }: { loadedSize: number; totalSize: number }) => {
    if (loadedSize === 0) {
      progressBar.start(totalSize, loadedSize);
    } else if (loadedSize === totalSize) {
      progressBar.update(loadedSize);
      progressBar.stop();
    } else {
      progressBar.update(loadedSize);
    }
  };
};

const deployAction: SdkGuardedFunction<DeployActionArgs> = async ({ sdk, args }) => {
  const fileLikeObject = await getFunctionCodeOrPrompt({ filePath: args.filePath });
  const functionToDeploy = await getFunctionOrPrompt({ name: args.name, sdk });

  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadFunctionCodeToIpfs'),
    },
    cliProgress.Presets.shades_grey
  );

  const uploadResult = await sdk.storage().uploadFile({ file: fileLikeObject, onUploadProgress: uploadOnProgress(progressBar) });

  if (!uploadResult.pin.cid) {
    output.error(t('commonFunctionActionFailure', { action: 'deploy', tryAgain: t('tryAgain'), message: 'Failed to upload to IPFS' }));

    return;
  }

  await sdk.functions().deploy({ functionId: functionToDeploy.id, cid: uploadResult.pin.cid });

  output.printNewLine();
  output.success(t('commonNameCreateSuccess', { name: 'deployment' }));
  output.printNewLine();
  output.log(t('youCanDoXUsingFolCmd', { action: t('invokeFunction') }));
  output.chore(t('followLinkToInvokeFunction'));
  output.link(functionToDeploy.invokeUrl);
};

export const deployActionHandler = withGuards(deployAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
