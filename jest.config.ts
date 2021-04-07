

export default {
  preset: "ts-jest",
  testMatch: ["<rootDir>/test/**/*.(spec|test).ts?(x)"],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    "^.+\\.js$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  // 下面非要从重要, 将不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
  transformIgnorePatterns: [
    "/!node_modules\\/lodash-es/"
  ],
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  }
};
