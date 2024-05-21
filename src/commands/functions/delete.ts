import { output } from '../../cli';
import { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';

type DeleteActionArgs = {
  name?: string;
};

const deleteAction: SdkGuardedFunction<DeleteActionArgs> = async ({ sdk, args }) => {
  const functionToDelete = await getFunctionOrPrompt({ name: args.name, sdk });
  await sdk.functions().delete({ id: functionToDelete.id });

  output.printNewLine();
  output.success(t('commonNameDeleteSuccess', { name: 'function' }));
  output.printNewLine();
};

export const deleteActionHandler = withGuards(deleteAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});