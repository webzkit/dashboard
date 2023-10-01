import path from "path";
import fs from "fs-extra";
import inquirer from "inquirer";
import pkg from "../../../package.json";
import colors from "picocolors";

async function generateIcon() {
  const dir = path.resolve(process.cwd(), 'node_modules/@iconify/json');
  const raw = await fs.readJson(path.join(dir, 'collections.json'));

  const collections = Object.entries(raw).map(([id, v]) => ({
    ...(v as any),
    id
  }))

  const options = collections.map((item) => ({
    key: item.id,
    value: item.id,
    name: item.name
  }));

  inquirer.prompt([
    {
      type: 'list',
      name: 'useType',
      choices: [
        { key: 'local', value: 'local', name: 'Local' },
        { key: 'online', value: 'online', name: 'Online' },
      ],
      message: 'How to use icons'
    },
    {
      type: 'list',
      name: 'iconSet',
      choices: options,
      message: 'Select the icon set that needs to gen generated?'
    },
    {
      type: 'input',
      name: 'output',
      message: 'Select the icon set that needs to ben generated?',
      default: 'src/components/Icon/data'
    }
  ]).then(async (answers) => {
    const { iconSet, useType, output } = answers;
    const outputDir = path.resolve(process.cwd(), output);
    fs.ensureDir(outputDir);

    const genCollections = collections.filter((item) => [iconSet].includes(item.id));
    const prefixSet: string[] = [];

    for (const info of genCollections) {
      const data = await fs.readJson(path.join(dir, 'json', `${info.id}.json`));

      if (data) {
        const { prefix } = data;
        const isLocal = useType === 'local';
        const icons = Object.keys(data.icons).map(
          (item) => `${isLocal ? prefix + ':' : ''}${item}`,
        )

        await fs.writeFileSync(
          path.join(output, `icons.data.ts`),
          `export default ${isLocal ? JSON.stringify(icons) : JSON.stringify({ prefix, icons })}`
        );

        prefixSet.push(prefix);
      }
      fs.emptyDir(path.join(process.cwd(), 'node_modules/.vite'));
      console.log(
        `✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - Icon generated successfully:' + `[${prefixSet}]`,
      )
    }

  }).catch((error) => {
    console.log(error)
  });
}

generateIcon();
