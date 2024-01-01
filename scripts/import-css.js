const fs = require("fs");
const cwd = process.cwd();

const DIST_FOLDER = `${cwd}/dist`;

if (!fs.existsSync(DIST_FOLDER)) {
  return;
}

const cssFiles = fs
  .readdirSync(DIST_FOLDER, {
    withFileTypes: false,
  })
  .filter((file) => {
    return file.match(/\.css/);
  });

const cssImports = cssFiles.map(
  (file) => `<link rel="stylesheet" type="text/css" href="./${file}" />`
);

const htmlFilePath = `${DIST_FOLDER}/index.html`;
let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

const headCloseTag = "</head>";
const cssLinkString = cssImports.join("\n");

if (htmlContent.indexOf(headCloseTag) >= 0) {
  htmlContent = htmlContent.replace(
    headCloseTag,
    `${cssLinkString}\n${headCloseTag}`
  );
}

// 변경된 HTML 내용을 파일에 쓰기
fs.writeFileSync(htmlFilePath, htmlContent, "utf8");
