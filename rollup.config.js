import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";
export default defineConfig([
  {
    input: {
      index: "index.js", // 打包入口文件
    },
    output: [
      {
        dir: "dist", // 输出目标文件夹
        format: "es", // 输出 commonjs 文件
      },
    ],
    // 这些依赖的作用上文提到过
    plugins: [
      nodeResolve(),
      externals({
        devDeps: false, // 可以识别我们 package.json 中的依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
      }),
      json(),
      commonjs(),
      terser(),
      url({
        // 将文件大小小于10KB的图片文件转换为 base64 格式嵌入
        limit: 10 * 1024,
        // 图片文件的输出目录
        fileName: "assets/[name][extname]",
      }),
    ],
  },
]);
