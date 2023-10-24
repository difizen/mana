import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    hd: { rules: [] },
    name: 'mana',
    link: '/',
    logo: 'https://mdn.alipayobjects.com/huamei_hdnzbp/afts/img/A*u1e3T5UkoAgAAAAAAAAAAAAADjOxAQ/original',
    nav: [
      { title: '介绍', link: '/introduction' },
      { title: '教程', link: '/tutorial' },
      { title: '示例', link: '/examples' },
    ],
    banner: {
      title: 'mana',
      desc: '一个模块化的可扩展前端应用框架，为工作台型产品设计。',
      botton: [
        {
          name: '立即上手',
          link: '/tutorial',
        },
        {
          name: 'Github',
          link: 'https://github.com/difizen/mana',
        },
      ],
    },
    footer: `Open-source MIT Licensed | Copyright © 2023-present`,
    groupQR:
      'https://mdn.alipayobjects.com/huamei_hdnzbp/afts/img/A*-rvsQo9SnEkAAAAAAAAAAAAADjOxAQ/original',
    links: [
      {
        title: '资源',
        itemList: [
          {
            name: 'Difizen',
            link: 'https://github.com/difizen',
          },
          {
            name: 'mana',
            link: 'https://github.com/difizen/mana',
          },
          {
            name: 'libro',
            link: 'https://github.com/difizen/libro',
          },
        ],
      },
      {
        title: '社区',
        itemList: [
          {
            name: '提交反馈',
            link: 'https://github.com/difizen/mana/issues',
          },
          {
            name: '发布日志',
            link: 'https://github.com/difizen/mana/releases',
          },
        ],
      },
    ],
    techCardData: [
      {
        title: '为复杂前端应用开发而生',
        desc: '解决应用建设中的领域建模、模块划分、扩展性建设问题。',
        iconSrc:
          'https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png',
      },
      {
        title: '强大的二次开发能力',
        desc: '所有层次的内容均允许二次开发，在 mana 的体系内，你写出的代码默认具备二次开发能力。',
        iconSrc:
          'https://gw.alipayobjects.com/zos/bmw-prod/f093e060-726e-471c-a53e-e988ed3f560c/kj9t9sk7_w144_h144.png',
      },
      {
        title: '开箱即用',
        desc: '提供各类工作台的解决方案，基于现有组件的组合快速上手。',
        iconSrc:
          'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
      },
    ],
  },
  favicons: [
    'https://gw-office.alipayobjects.com/bmw-prod/0e2a3424-71b6-40e4-bb34-364aec782200.ico',
  ],
  extraBabelPlugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    'babel-plugin-parameter-decorator',
  ],
  plugins: ['./dumi-plugin-alias', './dumi-plugin-nodenext'],
  exportStatic: {},
  resolve: {
    docDirs: ['docs'],
    codeBlockMode: 'passive',
  },
});
