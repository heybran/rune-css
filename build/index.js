import { transform } from "lightningcss";
import { Buffer } from "node:buffer";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// define default output file name
const __def_out_put_file_name = "styles_lightning_min.css";
const __def_out_put_file_name_map = "styles_lightning_min.css.map";

async function processCss() {
	try {
		const filePath = path.join(__dirname, "../dist", "styles.css");
		const cssBuffer = await readFile(filePath);
		const { code, map } = await transform({
			code: Buffer.from(cssBuffer),
			minify: true,
			sourceMap: true,
		});
		const outputPath = path.join(__dirname, "../dist", __def_out_put_file_name);
		await writeFile(outputPath, code);
		const outputPathMap = path.join(
			__dirname,
			"../dist",
			__def_out_put_file_name_map
		);
		await writeFile(outputPathMap, map);
		console.log("CSS files successfully built into dist folder with lightningcss.");
	} catch (error) {
		console.error("Error occurs when building and minifying css files: ", error);
	}
}

processCss();
