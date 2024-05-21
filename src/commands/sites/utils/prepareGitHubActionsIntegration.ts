import { generateDeploymentWorkflowYaml } from '@fleekxyz/utils-github';
import { join as joinPath } from 'path';

import { Output } from '../../../output/Output';
import { confirmFileOverridePrompt } from '../prompts/confirmFileOverridePrompt';
import { fileExists } from './fileExists';
import { getDeploymentWorkflowYamlLocation } from './getDeploymentWorkflowYamlLocation';
import { initializeDeploymentWorkflowDirectory } from './initializeDeploymentWorkflowDirectory';
import { requestDeploymentWorkflowInstallCommand } from './requestDeploymentWorkflowInstallCommand';
import { saveDeploymentWorkflowYaml } from './saveDeploymentWorkflowYaml';

export const ghWorkflowFilename = 'fleek-deploy.yaml';
export const ghActionsWorflowsDirectory = joinPath(process.cwd(), '.github/workflows');
export const ghActionsDeploySitesYamlPath = joinPath(ghActionsWorflowsDirectory, ghWorkflowFilename);

type PrepareGitHubActionsIntegrationArgs = {
  personalAccessToken: string;
  projectId: string;
  fleekConfigPath?: string;
  output: Output;
};

export const prepareGitHubActionsIntegration = async ({
  personalAccessToken,
  projectId,
  fleekConfigPath,
  output,
}: PrepareGitHubActionsIntegrationArgs) => {
  const installCommand = await requestDeploymentWorkflowInstallCommand();
  const yamlContent = generateDeploymentWorkflowYaml({
    fleekConfigPath,
    installCommand,
  });
  const yamlPath = await getDeploymentWorkflowYamlLocation();
  const pathExists = await fileExists(yamlPath);

  if (pathExists && !(await confirmFileOverridePrompt({ path: yamlPath }))) {
    return;
  }

  if (yamlPath === ghActionsDeploySitesYamlPath) {
    await initializeDeploymentWorkflowDirectory({
      output,
      ghActionsWorflowsDirectory,
    });
  }

  await saveDeploymentWorkflowYaml({
    yamlPath,
    yamlContent,
    personalAccessToken,
    projectId,
    output,
  });
};
