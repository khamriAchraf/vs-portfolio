/** @type {import('i18next-cli').I18nextToolkitConfig} */
module.exports = {
  locales: [
    "en",
    "fr"
  ],
  extract: {
    input: [
      "src/pages/*.{js,jsx,mjs,ts,tsx}",
      "components/**/*.{js,jsx,mjs,ts,tsx}"
    ],
    output: "public/locales/{{language}}/{{namespace}}.json"
  }
}