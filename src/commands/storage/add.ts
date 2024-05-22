import { getCfIpfsGatewayUrl, getPrivateIpfsGatewayUrl } from '@fleek-platform/utils-ipfs';
import cliProgress from 'cli-progress';
import { filesFromPaths } from 'files-from-path';
import { existsSync, promises as fs } from 'fs';
import { basename } from 'path';

import { output } from '../../cli';
import { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getAllActivePrivateGatewayDomains } from '../gateways/utils/getAllPrivateGatewayDomains';

type AddStorageActionArgs = {
  path: string;
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

export const addStorageAction: SdkGuardedFunction<AddStorageActionArgs> = async ({ sdk, args }) => {
  if (!existsSync(args.path)) {
    output.error(t('filePathNotFound', { path: args.path }));

    return;
  }

  const progressBar = new cliProgress.SingleBar(
    {
      format: 'Upload Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
    },
    cliProgress.Presets.shades_grey
  );
  const stat = await fs.stat(args.path);

  const directoryName = basename(args.path);
  const files = await filesFromPaths([args.path]);
  const storage = stat.isDirectory()
    ? await sdk.storage().uploadVirtualDirectory({ files, directoryName, onUploadProgress: uploadOnProgress(progressBar) })
    : await sdk.storage().uploadFile({ file: files[0], onUploadProgress: uploadOnProgress(progressBar) });

  if (!storage) {
    output.error(t('somethingWrongDurUpload'));

    return;
  }

  const hash = storage?.pin.cid.toString();

  if (storage.duplicate) {
    output.warn(t('fileAlreadyExistWarn', { path: args.path }));

    output.printNewLine();
  } else {
    output.success(hash);
    output.printNewLine();
  }

  const privateGatewayDomains = await getAllActivePrivateGatewayDomains({ sdk });

  if (privateGatewayDomains.length === 0) {
    output.log(t('visitViaGateway'));
    output.link(getCfIpfsGatewayUrl(hash));

    return;
  }

  output.log(t('visitViaPvtGw'));

  for (const privateGatewayDomain of privateGatewayDomains) {
    output.link(getPrivateIpfsGatewayUrl({ hostname: privateGatewayDomain.hostname, hash }));
  }

  output.printNewLine();
};

export const addStorageActionHandler = withGuards(addStorageAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
