const fs = require('fs')
const path = require('path')

export function createPreprocessor() {
  const dirResource = path.resolve(process.cwd(), 'src/layouts/default/assets/scss/resources');
  const scssResources = []

  fs.readdirSync(dirResource).map(dirname => {
    if (fs.statSync(`${dirResource}/${dirname}`).isFile()) {
      // @ts-ignore
      scssResources.push(`@use "${dirResource}/${dirname}" as *;`)
    }
  })

  return scssResources.join('');
}
