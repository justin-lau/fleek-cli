import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { getFunctionCodeOrPrompt } from './getFunctionCodeOrPrompt';

vi.mock('../../../prompts/textPrompt', () => ({ textPrompt: vi.fn().mockResolvedValue(__dirname + '/test.js') }));

describe('Get function code', () => {
  it('returns the function code', async () => {
    await expect(getFunctionCodeOrPrompt({ filePath: __dirname + '/test.js' })).resolves.toHaveProperty('name');
  });
});

describe('Prompt user for function code path', () => {
  it('shows text prompt for function code', async () => {
    await expect(getFunctionCodeOrPrompt({})).resolves.toHaveProperty('name');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
