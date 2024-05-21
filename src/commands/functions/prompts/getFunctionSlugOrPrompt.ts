import { FleekFunctionSlugNotValidError } from '@fleekxyz/errors';
import { isFunctionSlugValid } from '@fleekxyz/utils-validation';

type GetFunctionSlugOrPromptArgs = {
  slug?: string;
};

export const getFunctionSlugOrPrompt = async ({ slug }: GetFunctionSlugOrPromptArgs): Promise<string> => {
  if (slug && isFunctionSlugValid({ slug })) {
    return slug;
  }

  throw new FleekFunctionSlugNotValidError({ slug: slug! });
};
