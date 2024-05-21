import { UnauthenticatedError } from '@fleekxyz/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';

import { output } from '../cli';
import { config } from '../config';
import { loginGuard } from './loginGuard';
import { Action, SdkGuardedFunction } from './types';

type SdkGuardArgs<T> = SdkGuardedFunction<T>;

export const getSdkClient = () => {
  const personalAccessToken = config.personalAccessToken.get();
  const projectId = config.projectId.get();

  if (!personalAccessToken) {
    return;
  }

  const accessTokenService = new PersonalAccessTokenService({ projectId, personalAccessToken });
  const sdk = new FleekSdk({ accessTokenService });

  return sdk;
};

export const sdkGuard = <T>(func: SdkGuardArgs<T>): Action<T> => {
  return async (args: T = {} as T) => {
    await loginGuard();

    const sdk = getSdkClient();

    if (!sdk) {
      throw new UnauthenticatedError();
    }

    try {
      await func({ sdk, args });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      output.error(error?.toString());
    }
  };
};
