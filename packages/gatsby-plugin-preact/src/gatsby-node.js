const path = require('path')
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // Requiring the server version of React-dom is hardcoded right now
  // in the development server. So we'll just avoid loading Preact there
  // for now.
  if (stage !== `develop-html`) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          // preact-compat does not yet ship with createContext as an export
          // instead, use our file that imports everything from preact-compat and exports it back out, but this time with createContext included
          react: path.resolve(__dirname, './preact-compat'),
          "react-dom": `preact-compat`,
          "create-react-class": `preact-compat/lib/create-react-class`,
          "create-react-context": `preact-context/dist/context`,
        },
      },
    })
  }
}
