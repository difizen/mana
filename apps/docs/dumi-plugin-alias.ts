import type { IApi } from 'dumi';
import execa from 'execa';

// dumi 2 不感知 monorepo 了，所以包名到 src 的 alias 要自己手动配置，比如 alias: { pkg: path.join(__dirname, 'packages/pkg/src') }
// alias: {
//   '@alipay/ai-infra-dynamic-layout': path.join(__dirname, 'packages/dynamic-layout/src'),
//   '@alipay/ai-infra-layout-generator': path.join(__dirname, 'packages/layout-generator/src'),
// },

export default (api: IApi) => {
  api.modifyWebpackConfig(async (memo) => {
    const { stdout } = execa.commandSync('pnpm m ls --json --depth=-1');
    try {
      const list = JSON.parse(stdout);
      list.forEach((item) => {
        if (memo.resolve?.alias) {
          memo.resolve.alias[`${item.name}/lib/mock`] = `${item.path}/src/mock`;
          memo.resolve.alias[item.name] = `${item.path}/src`;
        }
      });
    } catch (_e) {
      //
    }
    return memo;
  });
};
