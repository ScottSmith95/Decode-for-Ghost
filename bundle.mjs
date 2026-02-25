import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname);
const outputDir = path.join(projectRoot, 'dist');
const outputZip = path.join(outputDir, 'decode.zip');

const includedTopLevelDirs = new Set(['assets', 'locales', 'partials']);
const excludedTopLevelDirs = new Set(['node_modules', 'dist']);

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function collectBundleFiles(currentRelDir = '') {
  const absoluteDir = path.join(projectRoot, currentRelDir);
  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(currentRelDir, entry.name);
    const isRoot = currentRelDir === '';

    if (isRoot && entry.name.startsWith('.')) {
      continue;
    }

    if (isRoot && excludedTopLevelDirs.has(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      if (isRoot && !includedTopLevelDirs.has(entry.name)) {
        continue;
      }
      files.push(...collectBundleFiles(relativePath));
      continue;
    }

    files.push(toPosixPath(relativePath));
  }

  return files;
}

function writeBundle() {
  const files = collectBundleFiles().sort();
  const zip = new AdmZip();

  for (const file of files) {
    const absoluteFilePath = path.join(projectRoot, file);
    const zipDir = path.posix.dirname(file);
    const zipFileName = path.posix.basename(file);

    zip.addLocalFile(absoluteFilePath, zipDir === '.' ? '' : zipDir, zipFileName);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  if (fs.existsSync(outputZip)) {
    fs.unlinkSync(outputZip);
  }

  zip.writeZip(outputZip);
  console.log(`Bundled ${files.length} files into ${toPosixPath(path.relative(projectRoot, outputZip))}`);
}

writeBundle();
