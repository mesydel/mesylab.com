const fs = require('fs')
const path = require('path')

const walkDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  return fs.readdirSync(directoryPath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const absolutePath = path.join(directoryPath, entry.name)

      if (entry.isDirectory()) {
        return walkDirectory(absolutePath)
      }

      return [absolutePath]
    })
}

const ensureDirectory = (directoryPath) => {
  fs.mkdirSync(directoryPath, { recursive: true })
}

const writeFile = (filePath, contents) => {
  ensureDirectory(path.dirname(filePath))
  fs.writeFileSync(filePath, contents)
}

const toPosixPath = (value) => value.split(path.sep).join('/')

module.exports = {
  ensureDirectory,
  toPosixPath,
  walkDirectory,
  writeFile
}
