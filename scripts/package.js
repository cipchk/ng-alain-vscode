const fs = require('fs');
const path = require('path');

const NAME = 'ng-alain-vscode';
const DEFAULT_LANG = 'en-US';

function getJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath).toString('utf8'));
}

const lang = process.argv[2] || 'zh-CN';
const i18n = getJson(path.join(__dirname, 'i18n.json'))[lang];

const rootPackagePath = path.join(__dirname, '../package.json');
const rootPackage = getJson(rootPackagePath);

if (lang === DEFAULT_LANG) {
  rootPackage.name = `${NAME}`;
} else {
  rootPackage.name = `${NAME}-${lang}`;
}
rootPackage.displayName = i18n.displayName;
rootPackage.description = i18n.description;
delete rootPackage.devDependencies;

fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2));