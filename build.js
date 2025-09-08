const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const distDir = "dist";

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Entry points for our JS files
const entryPoints = [
  "background.js",
  "newtab.js",
  "options.js",
  "newtab_content.js",
];

// Files to copy directly
const filesToCopy = ["manifest.json", "newtab.html", "options.html"];

// esbuild configuration
esbuild
  .build({
    entryPoints: entryPoints,
    bundle: true,
    outdir: distDir,
    minify: true,
    sourcemap: "inline",
  })
  .then(() => {
    // Copy static files
    filesToCopy.forEach((file) => {
      fs.copyFileSync(
        path.join(__dirname, file),
        path.join(__dirname, distDir, file)
      );
    });
    console.log("Build finished successfully.");
  })
  .catch(() => process.exit(1));
