// https://ourcodeworld.com/articles/read/1549/how-to-use-web-workers-in-vuejs

importScripts("https://unpkg.com/prettier@2.7.1/standalone.js");
importScripts("https://unpkg.com/prettier@2.7.1/parser-babel.js");

function formatCode(code) {
  return prettier.format(code, {
    parser: "babel",
    plugins: prettierPlugins,
  });
}

onmessage = (e) => {
  postMessage({ code: formatCode(e.data.code) });
};
