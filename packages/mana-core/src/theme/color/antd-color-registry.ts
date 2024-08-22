import { singleton } from '@difizen/mana-syringe';

import { ColorContribution } from './color-protocol';
import type { ColorRegistry } from './color-registry';
import { Color } from './color-registry';

@singleton({ contrib: ColorContribution })
export class AntdColorRegistry implements ColorContribution {
  registerColors(colors: ColorRegistry): void {
    colors.register(
      ...[
        {
          id: 'ant.blue',
          defaults: {
            dark: '#1677FF',
            light: '#1677FF',
          },
          description: '',
        },

        {
          id: 'ant.purple',
          defaults: {
            dark: '#722ED1',
            light: '#722ED1',
          },
          description: '',
        },

        {
          id: 'ant.cyan',
          defaults: {
            dark: '#13C2C2',
            light: '#13C2C2',
          },
          description: '',
        },

        {
          id: 'ant.green',
          defaults: {
            dark: '#52C41A',
            light: '#52C41A',
          },
          description: '',
        },

        {
          id: 'ant.magenta',
          defaults: {
            dark: '#EB2F96',
            light: '#EB2F96',
          },
          description: '',
        },

        {
          id: 'ant.pink',
          defaults: {
            dark: '#EB2F96',
            light: '#EB2F96',
          },
          description: '',
        },

        {
          id: 'ant.red',
          defaults: {
            dark: '#F5222D',
            light: '#F5222D',
          },
          description: '',
        },

        {
          id: 'ant.orange',
          defaults: {
            dark: '#FA8C16',
            light: '#FA8C16',
          },
          description: '',
        },

        {
          id: 'ant.yellow',
          defaults: {
            dark: '#FADB14',
            light: '#FADB14',
          },
          description: '',
        },

        {
          id: 'ant.volcano',
          defaults: {
            dark: '#FA541C',
            light: '#FA541C',
          },
          description: '',
        },

        {
          id: 'ant.geekblue',
          defaults: {
            dark: '#2F54EB',
            light: '#2F54EB',
          },
          description: '',
        },

        {
          id: 'ant.gold',
          defaults: {
            dark: '#FAAD14',
            light: '#FAAD14',
          },
          description: '',
        },

        {
          id: 'ant.lime',
          defaults: {
            dark: '#A0D911',
            light: '#A0D911',
          },
          description: '',
        },

        {
          id: 'ant.color.primary',
          defaults: {
            dark: '#1668dc',
            light: '#1677ff',
          },
          description: '',
        },

        {
          id: 'ant.color.success',
          defaults: {
            dark: '#49aa19',
            light: '#52c41a',
          },
          description: '',
        },

        {
          id: 'ant.color.warning',
          defaults: {
            dark: '#d89614',
            light: '#faad14',
          },
          description: '',
        },

        {
          id: 'ant.color.error',
          defaults: {
            dark: '#dc4446',
            light: '#ff4d4f',
          },
          description: '',
        },

        {
          id: 'ant.color.info',
          defaults: {
            dark: '#1668dc',
            light: '#1677ff',
          },
          description: '',
        },

        {
          id: 'ant.color.link',
          defaults: {
            dark: '#1668dc',
            light: '#1677ff',
          },
          description: '',
        },

        {
          id: 'ant.color.text.base',
          defaults: {
            dark: '#fff',
            light: '#000',
          },
          description: '',
        },

        {
          id: 'ant.color.bg.base',
          defaults: {
            dark: '#000',
            light: '#fff',
          },
          description: '',
        },

        {
          id: 'ant.font.family',
          defaults: {
            dark: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji'",
            light:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji'",
          },
          description: '',
        },

        {
          id: 'ant.font.family.code',
          defaults: {
            dark: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
            light:
              "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
          },
          description: '',
        },

        {
          id: 'ant.font.size',
          defaults: {
            dark: '14px',
            light: '14px',
          },
          description: '',
        },

        {
          id: 'ant.line.width',
          defaults: {
            dark: '1px',
            light: '1px',
          },
          description: '',
        },

        {
          id: 'ant.line.type',
          defaults: {
            dark: 'solid',
            light: 'solid',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.out.circ',
          defaults: {
            dark: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
            light: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.in.out.circ',
          defaults: {
            dark: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
            light: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.out',
          defaults: {
            dark: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            light: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.in.out',
          defaults: {
            dark: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            light: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.out.back',
          defaults: {
            dark: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
            light: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.in.back',
          defaults: {
            dark: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
            light: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.in.quint',
          defaults: {
            dark: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            light: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
          },
          description: '',
        },

        {
          id: 'ant.motion.ease.out.quint',
          defaults: {
            dark: 'cubic-bezier(0.23, 1, 0.32, 1)',
            light: 'cubic-bezier(0.23, 1, 0.32, 1)',
          },
          description: '',
        },

        {
          id: 'ant.border.radius',
          defaults: {
            dark: '6px',
            light: '6px',
          },
          description: '',
        },

        {
          id: 'ant.size.popup.arrow',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.control.height',
          defaults: {
            dark: '32px',
            light: '32px',
          },
          description: '',
        },

        {
          id: 'ant.z.index.base',
          defaults: {
            dark: '0',
            light: '0',
          },
          description: '',
        },

        {
          id: 'ant.z.index.popup.base',
          defaults: {
            dark: '1000',
            light: '1000',
          },
          description: '',
        },

        {
          id: 'ant.opacity.image',
          defaults: {
            dark: '1',
            light: '1',
          },
          description: '',
        },

        {
          id: 'ant.blue.1',
          defaults: {
            dark: '#111a2c',
            light: '#e6f4ff',
          },
          description: '',
        },

        {
          id: 'ant.blue.2',
          defaults: {
            dark: '#112545',
            light: '#bae0ff',
          },
          description: '',
        },

        {
          id: 'ant.blue.3',
          defaults: {
            dark: '#15325b',
            light: '#91caff',
          },
          description: '',
        },

        {
          id: 'ant.blue.4',
          defaults: {
            dark: '#15417e',
            light: '#69b1ff',
          },
          description: '',
        },

        {
          id: 'ant.blue.5',
          defaults: {
            dark: '#1554ad',
            light: '#4096ff',
          },
          description: '',
        },

        {
          id: 'ant.blue.6',
          defaults: {
            dark: '#1668dc',
            light: '#1677ff',
          },
          description: '',
        },

        {
          id: 'ant.blue.7',
          defaults: {
            dark: '#3c89e8',
            light: '#0958d9',
          },
          description: '',
        },

        {
          id: 'ant.blue.8',
          defaults: {
            dark: '#65a9f3',
            light: '#003eb3',
          },
          description: '',
        },

        {
          id: 'ant.blue.9',
          defaults: {
            dark: '#8dc5f8',
            light: '#002c8c',
          },
          description: '',
        },

        {
          id: 'ant.blue.10',
          defaults: {
            dark: '#b7dcfa',
            light: '#001d66',
          },
          description: '',
        },

        {
          id: 'ant.purple.1',
          defaults: {
            dark: '#1a1325',
            light: '#f9f0ff',
          },
          description: '',
        },

        {
          id: 'ant.purple.2',
          defaults: {
            dark: '#24163a',
            light: '#efdbff',
          },
          description: '',
        },

        {
          id: 'ant.purple.3',
          defaults: {
            dark: '#301c4d',
            light: '#d3adf7',
          },
          description: '',
        },

        {
          id: 'ant.purple.4',
          defaults: {
            dark: '#3e2069',
            light: '#b37feb',
          },
          description: '',
        },

        {
          id: 'ant.purple.5',
          defaults: {
            dark: '#51258f',
            light: '#9254de',
          },
          description: '',
        },

        {
          id: 'ant.purple.6',
          defaults: {
            dark: '#642ab5',
            light: '#722ed1',
          },
          description: '',
        },

        {
          id: 'ant.purple.7',
          defaults: {
            dark: '#854eca',
            light: '#531dab',
          },
          description: '',
        },

        {
          id: 'ant.purple.8',
          defaults: {
            dark: '#ab7ae0',
            light: '#391085',
          },
          description: '',
        },

        {
          id: 'ant.purple.9',
          defaults: {
            dark: '#cda8f0',
            light: '#22075e',
          },
          description: '',
        },

        {
          id: 'ant.purple.10',
          defaults: {
            dark: '#ebd7fa',
            light: '#120338',
          },
          description: '',
        },

        {
          id: 'ant.cyan.1',
          defaults: {
            dark: '#112123',
            light: '#e6fffb',
          },
          description: '',
        },

        {
          id: 'ant.cyan.2',
          defaults: {
            dark: '#113536',
            light: '#b5f5ec',
          },
          description: '',
        },

        {
          id: 'ant.cyan.3',
          defaults: {
            dark: '#144848',
            light: '#87e8de',
          },
          description: '',
        },

        {
          id: 'ant.cyan.4',
          defaults: {
            dark: '#146262',
            light: '#5cdbd3',
          },
          description: '',
        },

        {
          id: 'ant.cyan.5',
          defaults: {
            dark: '#138585',
            light: '#36cfc9',
          },
          description: '',
        },

        {
          id: 'ant.cyan.6',
          defaults: {
            dark: '#13a8a8',
            light: '#13c2c2',
          },
          description: '',
        },

        {
          id: 'ant.cyan.7',
          defaults: {
            dark: '#33bcb7',
            light: '#08979c',
          },
          description: '',
        },

        {
          id: 'ant.cyan.8',
          defaults: {
            dark: '#58d1c9',
            light: '#006d75',
          },
          description: '',
        },

        {
          id: 'ant.cyan.9',
          defaults: {
            dark: '#84e2d8',
            light: '#00474f',
          },
          description: '',
        },

        {
          id: 'ant.cyan.10',
          defaults: {
            dark: '#b2f1e8',
            light: '#002329',
          },
          description: '',
        },

        {
          id: 'ant.green.1',
          defaults: {
            dark: '#162312',
            light: '#f6ffed',
          },
          description: '',
        },

        {
          id: 'ant.green.2',
          defaults: {
            dark: '#1d3712',
            light: '#d9f7be',
          },
          description: '',
        },

        {
          id: 'ant.green.3',
          defaults: {
            dark: '#274916',
            light: '#b7eb8f',
          },
          description: '',
        },

        {
          id: 'ant.green.4',
          defaults: {
            dark: '#306317',
            light: '#95de64',
          },
          description: '',
        },

        {
          id: 'ant.green.5',
          defaults: {
            dark: '#3c8618',
            light: '#73d13d',
          },
          description: '',
        },

        {
          id: 'ant.green.6',
          defaults: {
            dark: '#49aa19',
            light: '#52c41a',
          },
          description: '',
        },

        {
          id: 'ant.green.7',
          defaults: {
            dark: '#6abe39',
            light: '#389e0d',
          },
          description: '',
        },

        {
          id: 'ant.green.8',
          defaults: {
            dark: '#8fd460',
            light: '#237804',
          },
          description: '',
        },

        {
          id: 'ant.green.9',
          defaults: {
            dark: '#b2e58b',
            light: '#135200',
          },
          description: '',
        },

        {
          id: 'ant.green.10',
          defaults: {
            dark: '#d5f2bb',
            light: '#092b00',
          },
          description: '',
        },

        {
          id: 'ant.magenta.1',
          defaults: {
            dark: '#291321',
            light: '#fff0f6',
          },
          description: '',
        },

        {
          id: 'ant.magenta.2',
          defaults: {
            dark: '#40162f',
            light: '#ffd6e7',
          },
          description: '',
        },

        {
          id: 'ant.magenta.3',
          defaults: {
            dark: '#551c3b',
            light: '#ffadd2',
          },
          description: '',
        },

        {
          id: 'ant.magenta.4',
          defaults: {
            dark: '#75204f',
            light: '#ff85c0',
          },
          description: '',
        },

        {
          id: 'ant.magenta.5',
          defaults: {
            dark: '#a02669',
            light: '#f759ab',
          },
          description: '',
        },

        {
          id: 'ant.magenta.6',
          defaults: {
            dark: '#cb2b83',
            light: '#eb2f96',
          },
          description: '',
        },

        {
          id: 'ant.magenta.7',
          defaults: {
            dark: '#e0529c',
            light: '#c41d7f',
          },
          description: '',
        },

        {
          id: 'ant.magenta.8',
          defaults: {
            dark: '#f37fb7',
            light: '#9e1068',
          },
          description: '',
        },

        {
          id: 'ant.magenta.9',
          defaults: {
            dark: '#f8a8cc',
            light: '#780650',
          },
          description: '',
        },

        {
          id: 'ant.magenta.10',
          defaults: {
            dark: '#fad2e3',
            light: '#520339',
          },
          description: '',
        },

        {
          id: 'ant.pink.1',
          defaults: {
            dark: '#291321',
            light: '#fff0f6',
          },
          description: '',
        },

        {
          id: 'ant.pink.2',
          defaults: {
            dark: '#40162f',
            light: '#ffd6e7',
          },
          description: '',
        },

        {
          id: 'ant.pink.3',
          defaults: {
            dark: '#551c3b',
            light: '#ffadd2',
          },
          description: '',
        },

        {
          id: 'ant.pink.4',
          defaults: {
            dark: '#75204f',
            light: '#ff85c0',
          },
          description: '',
        },

        {
          id: 'ant.pink.5',
          defaults: {
            dark: '#a02669',
            light: '#f759ab',
          },
          description: '',
        },

        {
          id: 'ant.pink.6',
          defaults: {
            dark: '#cb2b83',
            light: '#eb2f96',
          },
          description: '',
        },

        {
          id: 'ant.pink.7',
          defaults: {
            dark: '#e0529c',
            light: '#c41d7f',
          },
          description: '',
        },

        {
          id: 'ant.pink.8',
          defaults: {
            dark: '#f37fb7',
            light: '#9e1068',
          },
          description: '',
        },

        {
          id: 'ant.pink.9',
          defaults: {
            dark: '#f8a8cc',
            light: '#780650',
          },
          description: '',
        },

        {
          id: 'ant.pink.10',
          defaults: {
            dark: '#fad2e3',
            light: '#520339',
          },
          description: '',
        },

        {
          id: 'ant.red.1',
          defaults: {
            dark: '#2a1215',
            light: '#fff1f0',
          },
          description: '',
        },

        {
          id: 'ant.red.2',
          defaults: {
            dark: '#431418',
            light: '#ffccc7',
          },
          description: '',
        },

        {
          id: 'ant.red.3',
          defaults: {
            dark: '#58181c',
            light: '#ffa39e',
          },
          description: '',
        },

        {
          id: 'ant.red.4',
          defaults: {
            dark: '#791a1f',
            light: '#ff7875',
          },
          description: '',
        },

        {
          id: 'ant.red.5',
          defaults: {
            dark: '#a61d24',
            light: '#ff4d4f',
          },
          description: '',
        },

        {
          id: 'ant.red.6',
          defaults: {
            dark: '#d32029',
            light: '#f5222d',
          },
          description: '',
        },

        {
          id: 'ant.red.7',
          defaults: {
            dark: '#e84749',
            light: '#cf1322',
          },
          description: '',
        },

        {
          id: 'ant.red.8',
          defaults: {
            dark: '#f37370',
            light: '#a8071a',
          },
          description: '',
        },

        {
          id: 'ant.red.9',
          defaults: {
            dark: '#f89f9a',
            light: '#820014',
          },
          description: '',
        },

        {
          id: 'ant.red.10',
          defaults: {
            dark: '#fac8c3',
            light: '#5c0011',
          },
          description: '',
        },

        {
          id: 'ant.orange.1',
          defaults: {
            dark: '#2b1d11',
            light: '#fff7e6',
          },
          description: '',
        },

        {
          id: 'ant.orange.2',
          defaults: {
            dark: '#442a11',
            light: '#ffe7ba',
          },
          description: '',
        },

        {
          id: 'ant.orange.3',
          defaults: {
            dark: '#593815',
            light: '#ffd591',
          },
          description: '',
        },

        {
          id: 'ant.orange.4',
          defaults: {
            dark: '#7c4a15',
            light: '#ffc069',
          },
          description: '',
        },

        {
          id: 'ant.orange.5',
          defaults: {
            dark: '#aa6215',
            light: '#ffa940',
          },
          description: '',
        },

        {
          id: 'ant.orange.6',
          defaults: {
            dark: '#d87a16',
            light: '#fa8c16',
          },
          description: '',
        },

        {
          id: 'ant.orange.7',
          defaults: {
            dark: '#e89a3c',
            light: '#d46b08',
          },
          description: '',
        },

        {
          id: 'ant.orange.8',
          defaults: {
            dark: '#f3b765',
            light: '#ad4e00',
          },
          description: '',
        },

        {
          id: 'ant.orange.9',
          defaults: {
            dark: '#f8cf8d',
            light: '#873800',
          },
          description: '',
        },

        {
          id: 'ant.orange.10',
          defaults: {
            dark: '#fae3b7',
            light: '#612500',
          },
          description: '',
        },

        {
          id: 'ant.yellow.1',
          defaults: {
            dark: '#2b2611',
            light: '#feffe6',
          },
          description: '',
        },

        {
          id: 'ant.yellow.2',
          defaults: {
            dark: '#443b11',
            light: '#ffffb8',
          },
          description: '',
        },

        {
          id: 'ant.yellow.3',
          defaults: {
            dark: '#595014',
            light: '#fffb8f',
          },
          description: '',
        },

        {
          id: 'ant.yellow.4',
          defaults: {
            dark: '#7c6e14',
            light: '#fff566',
          },
          description: '',
        },

        {
          id: 'ant.yellow.5',
          defaults: {
            dark: '#aa9514',
            light: '#ffec3d',
          },
          description: '',
        },

        {
          id: 'ant.yellow.6',
          defaults: {
            dark: '#d8bd14',
            light: '#fadb14',
          },
          description: '',
        },

        {
          id: 'ant.yellow.7',
          defaults: {
            dark: '#e8d639',
            light: '#d4b106',
          },
          description: '',
        },

        {
          id: 'ant.yellow.8',
          defaults: {
            dark: '#f3ea62',
            light: '#ad8b00',
          },
          description: '',
        },

        {
          id: 'ant.yellow.9',
          defaults: {
            dark: '#f8f48b',
            light: '#876800',
          },
          description: '',
        },

        {
          id: 'ant.yellow.10',
          defaults: {
            dark: '#fafab5',
            light: '#614700',
          },
          description: '',
        },

        {
          id: 'ant.volcano.1',
          defaults: {
            dark: '#2b1611',
            light: '#fff2e8',
          },
          description: '',
        },

        {
          id: 'ant.volcano.2',
          defaults: {
            dark: '#441d12',
            light: '#ffd8bf',
          },
          description: '',
        },

        {
          id: 'ant.volcano.3',
          defaults: {
            dark: '#592716',
            light: '#ffbb96',
          },
          description: '',
        },

        {
          id: 'ant.volcano.4',
          defaults: {
            dark: '#7c3118',
            light: '#ff9c6e',
          },
          description: '',
        },

        {
          id: 'ant.volcano.5',
          defaults: {
            dark: '#aa3e19',
            light: '#ff7a45',
          },
          description: '',
        },

        {
          id: 'ant.volcano.6',
          defaults: {
            dark: '#d84a1b',
            light: '#fa541c',
          },
          description: '',
        },

        {
          id: 'ant.volcano.7',
          defaults: {
            dark: '#e87040',
            light: '#d4380d',
          },
          description: '',
        },

        {
          id: 'ant.volcano.8',
          defaults: {
            dark: '#f3956a',
            light: '#ad2102',
          },
          description: '',
        },

        {
          id: 'ant.volcano.9',
          defaults: {
            dark: '#f8b692',
            light: '#871400',
          },
          description: '',
        },

        {
          id: 'ant.volcano.10',
          defaults: {
            dark: '#fad4bc',
            light: '#610b00',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.1',
          defaults: {
            dark: '#131629',
            light: '#f0f5ff',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.2',
          defaults: {
            dark: '#161d40',
            light: '#d6e4ff',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.3',
          defaults: {
            dark: '#1c2755',
            light: '#adc6ff',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.4',
          defaults: {
            dark: '#203175',
            light: '#85a5ff',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.5',
          defaults: {
            dark: '#263ea0',
            light: '#597ef7',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.6',
          defaults: {
            dark: '#2b4acb',
            light: '#2f54eb',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.7',
          defaults: {
            dark: '#5273e0',
            light: '#1d39c4',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.8',
          defaults: {
            dark: '#7f9ef3',
            light: '#10239e',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.9',
          defaults: {
            dark: '#a8c1f8',
            light: '#061178',
          },
          description: '',
        },

        {
          id: 'ant.geekblue.10',
          defaults: {
            dark: '#d2e0fa',
            light: '#030852',
          },
          description: '',
        },

        {
          id: 'ant.gold.1',
          defaults: {
            dark: '#2b2111',
            light: '#fffbe6',
          },
          description: '',
        },

        {
          id: 'ant.gold.2',
          defaults: {
            dark: '#443111',
            light: '#fff1b8',
          },
          description: '',
        },

        {
          id: 'ant.gold.3',
          defaults: {
            dark: '#594214',
            light: '#ffe58f',
          },
          description: '',
        },

        {
          id: 'ant.gold.4',
          defaults: {
            dark: '#7c5914',
            light: '#ffd666',
          },
          description: '',
        },

        {
          id: 'ant.gold.5',
          defaults: {
            dark: '#aa7714',
            light: '#ffc53d',
          },
          description: '',
        },

        {
          id: 'ant.gold.6',
          defaults: {
            dark: '#d89614',
            light: '#faad14',
          },
          description: '',
        },

        {
          id: 'ant.gold.7',
          defaults: {
            dark: '#e8b339',
            light: '#d48806',
          },
          description: '',
        },

        {
          id: 'ant.gold.8',
          defaults: {
            dark: '#f3cc62',
            light: '#ad6800',
          },
          description: '',
        },

        {
          id: 'ant.gold.9',
          defaults: {
            dark: '#f8df8b',
            light: '#874d00',
          },
          description: '',
        },

        {
          id: 'ant.gold.10',
          defaults: {
            dark: '#faedb5',
            light: '#613400',
          },
          description: '',
        },

        {
          id: 'ant.lime.1',
          defaults: {
            dark: '#1f2611',
            light: '#fcffe6',
          },
          description: '',
        },

        {
          id: 'ant.lime.2',
          defaults: {
            dark: '#2e3c10',
            light: '#f4ffb8',
          },
          description: '',
        },

        {
          id: 'ant.lime.3',
          defaults: {
            dark: '#3e4f13',
            light: '#eaff8f',
          },
          description: '',
        },

        {
          id: 'ant.lime.4',
          defaults: {
            dark: '#536d13',
            light: '#d3f261',
          },
          description: '',
        },

        {
          id: 'ant.lime.5',
          defaults: {
            dark: '#6f9412',
            light: '#bae637',
          },
          description: '',
        },

        {
          id: 'ant.lime.6',
          defaults: {
            dark: '#8bbb11',
            light: '#a0d911',
          },
          description: '',
        },

        {
          id: 'ant.lime.7',
          defaults: {
            dark: '#a9d134',
            light: '#7cb305',
          },
          description: '',
        },

        {
          id: 'ant.lime.8',
          defaults: {
            dark: '#c9e75d',
            light: '#5b8c00',
          },
          description: '',
        },

        {
          id: 'ant.lime.9',
          defaults: {
            dark: '#e4f88b',
            light: '#3f6600',
          },
          description: '',
        },

        {
          id: 'ant.lime.10',
          defaults: {
            dark: '#f0fab5',
            light: '#254000',
          },
          description: '',
        },

        {
          id: 'ant.color.text',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.85),
            light: Color.rgba(0, 0, 0, 0.88),
          },
          description: '',
        },

        {
          id: 'ant.color.text.secondary',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.65),
            light: Color.rgba(0, 0, 0, 0.65),
          },
          description: '',
        },

        {
          id: 'ant.color.text.tertiary',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.45),
            light: Color.rgba(0, 0, 0, 0.45),
          },
          description: '',
        },

        {
          id: 'ant.color.text.quaternary',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.25),
            light: Color.rgba(0, 0, 0, 0.25),
          },
          description: '',
        },

        {
          id: 'ant.color.fill',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.18),
            light: Color.rgba(0, 0, 0, 0.15),
          },
          description: '',
        },

        {
          id: 'ant.color.fill.secondary',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.12),
            light: Color.rgba(0, 0, 0, 0.06),
          },
          description: '',
        },

        {
          id: 'ant.color.fill.tertiary',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.08),
            light: Color.rgba(0, 0, 0, 0.04),
          },
          description: '',
        },

        {
          id: 'ant.color.fill.quaternary',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.04),
            light: Color.rgba(0, 0, 0, 0.02),
          },
          description: '',
        },

        {
          id: 'ant.color.bg.layout',
          defaults: {
            dark: '#000000',
            light: '#f5f5f5',
          },
          description: '',
        },

        {
          id: 'ant.color.bg.container',
          defaults: {
            dark: '#141414',
            light: '#ffffff',
          },
          description: '',
        },

        {
          id: 'ant.color.bg.elevated',
          defaults: {
            dark: '#1f1f1f',
            light: '#ffffff',
          },
          description: '',
        },

        {
          id: 'ant.color.bg.spotlight',
          defaults: {
            dark: '#424242',
            light: Color.rgba(0, 0, 0, 0.85),
          },
          description: '',
        },

        {
          id: 'ant.color.bg.blur',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.04),
            light: 'transparent',
          },
          description: '',
        },

        {
          id: 'ant.color.border',
          defaults: {
            dark: '#424242',
            light: '#d9d9d9',
          },
          description: '',
        },

        {
          id: 'ant.color.border.secondary',
          defaults: {
            dark: '#303030',
            light: '#f0f0f0',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.bg',
          defaults: {
            dark: '#111a2c',
            light: '#e6f4ff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.bg.hover',
          defaults: {
            dark: '#112545',
            light: '#bae0ff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.border',
          defaults: {
            dark: '#15325b',
            light: '#91caff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.border.hover',
          defaults: {
            dark: '#15417e',
            light: '#69b1ff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.hover',
          defaults: {
            dark: '#3c89e8',
            light: '#4096ff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.active',
          defaults: {
            dark: '#1554ad',
            light: '#0958d9',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.text.hover',
          defaults: {
            dark: '#3c89e8',
            light: '#4096ff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.text',
          defaults: {
            dark: '#1668dc',
            light: '#1677ff',
          },
          description: '',
        },

        {
          id: 'ant.color.primary.text.active',
          defaults: {
            dark: '#1554ad',
            light: '#0958d9',
          },
          description: '',
        },

        {
          id: 'ant.color.success.bg',
          defaults: {
            dark: '#162312',
            light: '#f6ffed',
          },
          description: '',
        },

        {
          id: 'ant.color.success.bg.hover',
          defaults: {
            dark: '#1d3712',
            light: '#d9f7be',
          },
          description: '',
        },

        {
          id: 'ant.color.success.border',
          defaults: {
            dark: '#274916',
            light: '#b7eb8f',
          },
          description: '',
        },

        {
          id: 'ant.color.success.border.hover',
          defaults: {
            dark: '#306317',
            light: '#95de64',
          },
          description: '',
        },

        {
          id: 'ant.color.success.hover',
          defaults: {
            dark: '#306317',
            light: '#95de64',
          },
          description: '',
        },

        {
          id: 'ant.color.success.active',
          defaults: {
            dark: '#3c8618',
            light: '#389e0d',
          },
          description: '',
        },

        {
          id: 'ant.color.success.text.hover',
          defaults: {
            dark: '#6abe39',
            light: '#73d13d',
          },
          description: '',
        },

        {
          id: 'ant.color.success.text',
          defaults: {
            dark: '#49aa19',
            light: '#52c41a',
          },
          description: '',
        },

        {
          id: 'ant.color.success.text.active',
          defaults: {
            dark: '#3c8618',
            light: '#389e0d',
          },
          description: '',
        },

        {
          id: 'ant.color.error.bg',
          defaults: {
            dark: '#2c1618',
            light: '#fff2f0',
          },
          description: '',
        },

        {
          id: 'ant.color.error.bg.hover',
          defaults: {
            dark: '#451d1f',
            light: '#fff1f0',
          },
          description: '',
        },

        {
          id: 'ant.color.error.bg.active',
          defaults: {
            dark: '#5b2526',
            light: '#ffccc7',
          },
          description: '',
        },

        {
          id: 'ant.color.error.border',
          defaults: {
            dark: '#5b2526',
            light: '#ffccc7',
          },
          description: '',
        },

        {
          id: 'ant.color.error.border.hover',
          defaults: {
            dark: '#7e2e2f',
            light: '#ffa39e',
          },
          description: '',
        },

        {
          id: 'ant.color.error.hover',
          defaults: {
            dark: '#e86e6b',
            light: '#ff7875',
          },
          description: '',
        },

        {
          id: 'ant.color.error.active',
          defaults: {
            dark: '#ad393a',
            light: '#d9363e',
          },
          description: '',
        },

        {
          id: 'ant.color.error.text.hover',
          defaults: {
            dark: '#e86e6b',
            light: '#ff7875',
          },
          description: '',
        },

        {
          id: 'ant.color.error.text',
          defaults: {
            dark: '#dc4446',
            light: '#ff4d4f',
          },
          description: '',
        },

        {
          id: 'ant.color.error.text.active',
          defaults: {
            dark: '#ad393a',
            light: '#d9363e',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.bg',
          defaults: {
            dark: '#2b2111',
            light: '#fffbe6',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.bg.hover',
          defaults: {
            dark: '#443111',
            light: '#fff1b8',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.border',
          defaults: {
            dark: '#594214',
            light: '#ffe58f',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.border.hover',
          defaults: {
            dark: '#7c5914',
            light: '#ffd666',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.hover',
          defaults: {
            dark: '#7c5914',
            light: '#ffd666',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.active',
          defaults: {
            dark: '#aa7714',
            light: '#d48806',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.text.hover',
          defaults: {
            dark: '#e8b339',
            light: '#ffc53d',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.text',
          defaults: {
            dark: '#d89614',
            light: '#faad14',
          },
          description: '',
        },

        {
          id: 'ant.color.warning.text.active',
          defaults: {
            dark: '#aa7714',
            light: '#d48806',
          },
          description: '',
        },

        {
          id: 'ant.color.info.bg',
          defaults: {
            dark: '#111a2c',
            light: '#e6f4ff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.bg.hover',
          defaults: {
            dark: '#112545',
            light: '#bae0ff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.border',
          defaults: {
            dark: '#15325b',
            light: '#91caff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.border.hover',
          defaults: {
            dark: '#15417e',
            light: '#69b1ff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.hover',
          defaults: {
            dark: '#15417e',
            light: '#69b1ff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.active',
          defaults: {
            dark: '#1554ad',
            light: '#0958d9',
          },
          description: '',
        },

        {
          id: 'ant.color.info.text.hover',
          defaults: {
            dark: '#3c89e8',
            light: '#4096ff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.text',
          defaults: {
            dark: '#1668dc',
            light: '#1677ff',
          },
          description: '',
        },

        {
          id: 'ant.color.info.text.active',
          defaults: {
            dark: '#1554ad',
            light: '#0958d9',
          },
          description: '',
        },

        {
          id: 'ant.color.link.hover',
          defaults: {
            dark: '#15417e',
            light: '#69b1ff',
          },
          description: '',
        },

        {
          id: 'ant.color.link.active',
          defaults: {
            dark: '#1554ad',
            light: '#0958d9',
          },
          description: '',
        },

        {
          id: 'ant.color.bg.mask',
          defaults: {
            dark: Color.rgba(0, 0, 0, 0.45),
            light: Color.rgba(0, 0, 0, 0.45),
          },
          description: '',
        },

        {
          id: 'ant.color.white',
          defaults: {
            dark: '#fff',
            light: '#fff',
          },
          description: '',
        },

        {
          id: 'ant.font.size.sm',
          defaults: {
            dark: '12px',
            light: '12px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.lg',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.xl',
          defaults: {
            dark: '20px',
            light: '20px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.heading.1',
          defaults: {
            dark: '38px',
            light: '38px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.heading.2',
          defaults: {
            dark: '30px',
            light: '30px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.heading.3',
          defaults: {
            dark: '24px',
            light: '24px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.heading.4',
          defaults: {
            dark: '20px',
            light: '20px',
          },
          description: '',
        },

        {
          id: 'ant.font.size.heading.5',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.line.height',
          defaults: {
            dark: '1.5714285714285714',
            light: '1.5714285714285714',
          },
          description: '',
        },

        {
          id: 'ant.line.height.lg',
          defaults: {
            dark: '1.5',
            light: '1.5',
          },
          description: '',
        },

        {
          id: 'ant.line.height.sm',
          defaults: {
            dark: '1.6666666666666667',
            light: '1.6666666666666667',
          },
          description: '',
        },

        {
          id: 'ant.font.height',
          defaults: {
            dark: '22px',
            light: '22px',
          },
          description: '',
        },

        {
          id: 'ant.font.height.lg',
          defaults: {
            dark: '24px',
            light: '24px',
          },
          description: '',
        },

        {
          id: 'ant.font.height.sm',
          defaults: {
            dark: '20px',
            light: '20px',
          },
          description: '',
        },

        {
          id: 'ant.line.height.heading.1',
          defaults: {
            dark: '1.2105263157894737',
            light: '1.2105263157894737',
          },
          description: '',
        },

        {
          id: 'ant.line.height.heading.2',
          defaults: {
            dark: '1.2666666666666666',
            light: '1.2666666666666666',
          },
          description: '',
        },

        {
          id: 'ant.line.height.heading.3',
          defaults: {
            dark: '1.3333333333333333',
            light: '1.3333333333333333',
          },
          description: '',
        },

        {
          id: 'ant.line.height.heading.4',
          defaults: {
            dark: '1.4',
            light: '1.4',
          },
          description: '',
        },

        {
          id: 'ant.line.height.heading.5',
          defaults: {
            dark: '1.5',
            light: '1.5',
          },
          description: '',
        },

        {
          id: 'ant.control.height.sm',
          defaults: {
            dark: '24px',
            light: '24px',
          },
          description: '',
        },

        {
          id: 'ant.control.height.xs',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.control.height.lg',
          defaults: {
            dark: '40px',
            light: '40px',
          },
          description: '',
        },

        {
          id: 'ant.motion.duration.fast',
          defaults: {
            dark: '0.1s',
            light: '0.1s',
          },
          description: '',
        },

        {
          id: 'ant.motion.duration.mid',
          defaults: {
            dark: '0.2s',
            light: '0.2s',
          },
          description: '',
        },

        {
          id: 'ant.motion.duration.slow',
          defaults: {
            dark: '0.3s',
            light: '0.3s',
          },
          description: '',
        },

        {
          id: 'ant.line.width.bold',
          defaults: {
            dark: '2px',
            light: '2px',
          },
          description: '',
        },

        {
          id: 'ant.border.radius.xs',
          defaults: {
            dark: '2px',
            light: '2px',
          },
          description: '',
        },

        {
          id: 'ant.border.radius.sm',
          defaults: {
            dark: '4px',
            light: '4px',
          },
          description: '',
        },

        {
          id: 'ant.border.radius.lg',
          defaults: {
            dark: '8px',
            light: '8px',
          },
          description: '',
        },

        {
          id: 'ant.border.radius.outer',
          defaults: {
            dark: '4px',
            light: '4px',
          },
          description: '',
        },

        {
          id: 'ant.color.fill.content',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.12),
            light: Color.rgba(0, 0, 0, 0.06),
          },
          description: '',
        },

        {
          id: 'ant.color.fill.content.hover',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.18),
            light: Color.rgba(0, 0, 0, 0.15),
          },
          description: '',
        },

        {
          id: 'ant.color.fill.alter',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.04),
            light: Color.rgba(0, 0, 0, 0.02),
          },
          description: '',
        },

        {
          id: 'ant.color.bg.container.disabled',
          defaults: {
            dark: Color.rgba(20, 20, 20),
            light: Color.rgba(245, 245, 245),
          },
          description: '',
        },

        {
          id: 'ant.color.border.bg',
          defaults: {
            dark: '#141414',
            light: '#ffffff',
          },
          description: '',
        },

        {
          id: 'ant.color.split',
          defaults: {
            dark: Color.rgba(253, 253, 253, 0.12),
            light: Color.rgba(5, 5, 5, 0.06),
          },
          description: '',
        },

        {
          id: 'ant.color.text.placeholder',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.25),
            light: Color.rgba(0, 0, 0, 0.25),
          },
          description: '',
        },

        {
          id: 'ant.color.text.disabled',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.25),
            light: Color.rgba(0, 0, 0, 0.25),
          },
          description: '',
        },

        {
          id: 'ant.color.text.heading',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.85),
            light: Color.rgba(0, 0, 0, 0.88),
          },
          description: '',
        },

        {
          id: 'ant.color.text.label',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.65),
            light: Color.rgba(0, 0, 0, 0.65),
          },
          description: '',
        },

        {
          id: 'ant.color.text.description',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.45),
            light: Color.rgba(0, 0, 0, 0.45),
          },
          description: '',
        },

        {
          id: 'ant.color.text.light.solid',
          defaults: {
            dark: '#fff',
            light: '#fff',
          },
          description: '',
        },

        {
          id: 'ant.color.highlight',
          defaults: {
            dark: '#dc4446',
            light: '#ff4d4f',
          },
          description: '',
        },

        {
          id: 'ant.color.bg.text.hover',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.12),
            light: Color.rgba(0, 0, 0, 0.06),
          },
          description: '',
        },

        {
          id: 'ant.color.bg.text.active',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.18),
            light: Color.rgba(0, 0, 0, 0.15),
          },
          description: '',
        },

        {
          id: 'ant.color.icon',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.45),
            light: Color.rgba(0, 0, 0, 0.45),
          },
          description: '',
        },

        {
          id: 'ant.color.icon.hover',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.85),
            light: Color.rgba(0, 0, 0, 0.88),
          },
          description: '',
        },

        {
          id: 'ant.color.error.outline',
          defaults: {
            dark: Color.rgba(238, 38, 56, 0.11),
            light: Color.rgba(255, 38, 5, 0.06),
          },
          description: '',
        },

        {
          id: 'ant.color.warning.outline',
          defaults: {
            dark: Color.rgba(173, 107, 0, 0.15),
            light: Color.rgba(255, 215, 5, 0.1),
          },
          description: '',
        },

        {
          id: 'ant.font.size.icon',
          defaults: {
            dark: '12px',
            light: '12px',
          },
          description: '',
        },

        {
          id: 'ant.line.width.focus',
          defaults: {
            dark: '4px',
            light: '4px',
          },
          description: '',
        },

        {
          id: 'ant.control.outline.width',
          defaults: {
            dark: '2px',
            light: '2px',
          },
          description: '',
        },

        {
          id: 'ant.control.interactive.size',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.control.item.bg.hover',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.08),
            light: Color.rgba(0, 0, 0, 0.04),
          },
          description: '',
        },

        {
          id: 'ant.control.item.bg.active',
          defaults: {
            dark: '#111a2c',
            light: '#e6f4ff',
          },
          description: '',
        },

        {
          id: 'ant.control.item.bg.active.hover',
          defaults: {
            dark: '#112545',
            light: '#bae0ff',
          },
          description: '',
        },

        {
          id: 'ant.control.item.bg.active.disabled',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.18),
            light: Color.rgba(0, 0, 0, 0.15),
          },
          description: '',
        },

        {
          id: 'ant.control.tmp.outline',
          defaults: {
            dark: Color.rgba(255, 255, 255, 0.04),
            light: Color.rgba(0, 0, 0, 0.02),
          },
          description: '',
        },

        {
          id: 'ant.control.outline',
          defaults: {
            dark: Color.rgba(0, 60, 180, 0.15),
            light: Color.rgba(5, 145, 255, 0.1),
          },
          description: '',
        },

        {
          id: 'ant.font.weight.strong',
          defaults: {
            dark: '600',
            light: '600',
          },
          description: '',
        },

        {
          id: 'ant.opacity.loading',
          defaults: {
            dark: '0.65',
            light: '0.65',
          },
          description: '',
        },

        {
          id: 'ant.link.decoration',
          defaults: {
            dark: 'none',
            light: 'none',
          },
          description: '',
        },

        {
          id: 'ant.link.hover.decoration',
          defaults: {
            dark: 'none',
            light: 'none',
          },
          description: '',
        },

        {
          id: 'ant.link.focus.decoration',
          defaults: {
            dark: 'none',
            light: 'none',
          },
          description: '',
        },

        {
          id: 'ant.control.padding.horizontal',
          defaults: {
            dark: '12px',
            light: '12px',
          },
          description: '',
        },

        {
          id: 'ant.control.padding.horizontal.sm',
          defaults: {
            dark: '8px',
            light: '8px',
          },
          description: '',
        },

        {
          id: 'ant.padding.xxs',
          defaults: {
            dark: '4px',
            light: '4px',
          },
          description: '',
        },

        {
          id: 'ant.padding.xs',
          defaults: {
            dark: '8px',
            light: '8px',
          },
          description: '',
        },

        {
          id: 'ant.padding.sm',
          defaults: {
            dark: '12px',
            light: '12px',
          },
          description: '',
        },

        {
          id: 'ant.padding',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.padding.md',
          defaults: {
            dark: '20px',
            light: '20px',
          },
          description: '',
        },

        {
          id: 'ant.padding.lg',
          defaults: {
            dark: '24px',
            light: '24px',
          },
          description: '',
        },

        {
          id: 'ant.padding.xl',
          defaults: {
            dark: '32px',
            light: '32px',
          },
          description: '',
        },

        {
          id: 'ant.padding.content.horizontal.lg',
          defaults: {
            dark: '24px',
            light: '24px',
          },
          description: '',
        },

        {
          id: 'ant.padding.content.vertical.lg',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.padding.content.horizontal',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.padding.content.vertical',
          defaults: {
            dark: '12px',
            light: '12px',
          },
          description: '',
        },

        {
          id: 'ant.padding.content.horizontal.sm',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.padding.content.vertical.sm',
          defaults: {
            dark: '8px',
            light: '8px',
          },
          description: '',
        },

        {
          id: 'ant.margin.xxs',
          defaults: {
            dark: '4px',
            light: '4px',
          },
          description: '',
        },

        {
          id: 'ant.margin.xs',
          defaults: {
            dark: '8px',
            light: '8px',
          },
          description: '',
        },

        {
          id: 'ant.margin.sm',
          defaults: {
            dark: '12px',
            light: '12px',
          },
          description: '',
        },

        {
          id: 'ant.margin',
          defaults: {
            dark: '16px',
            light: '16px',
          },
          description: '',
        },

        {
          id: 'ant.margin.md',
          defaults: {
            dark: '20px',
            light: '20px',
          },
          description: '',
        },

        {
          id: 'ant.margin.lg',
          defaults: {
            dark: '24px',
            light: '24px',
          },
          description: '',
        },

        {
          id: 'ant.margin.xl',
          defaults: {
            dark: '32px',
            light: '32px',
          },
          description: '',
        },

        {
          id: 'ant.margin.xxl',
          defaults: {
            dark: '48px',
            light: '48px',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow',
          defaults: {
            dark: '0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            light:
              '0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.secondary',
          defaults: {
            dark: '0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            light:
              '0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.tertiary',
          defaults: {
            dark: '0 1px 2px 0 rgba(0, 0, 0, 0.03),\n      0 1px 6px -1px rgba(0, 0, 0, 0.02),\n      0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            light:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03),\n      0 1px 6px -1px rgba(0, 0, 0, 0.02),\n      0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.popover.arrow',
          defaults: {
            dark: '2px 2px 5px rgba(0, 0, 0, 0.05)',
            light: '2px 2px 5px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.card',
          defaults: {
            dark: '0 1px 2px -2px rgba(0, 0, 0, 0.16),\n      0 3px 6px 0 rgba(0, 0, 0, 0.12),\n      0 5px 12px 4px rgba(0, 0, 0, 0.09)',
            light:
              '0 1px 2px -2px rgba(0, 0, 0, 0.16),\n      0 3px 6px 0 rgba(0, 0, 0, 0.12),\n      0 5px 12px 4px rgba(0, 0, 0, 0.09)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.drawer.right',
          defaults: {
            dark: '-6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      -3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      -9px 0 28px 8px rgba(0, 0, 0, 0.05)',
            light:
              '-6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      -3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      -9px 0 28px 8px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.drawer.left',
          defaults: {
            dark: '6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      9px 0 28px 8px rgba(0, 0, 0, 0.05)',
            light:
              '6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      9px 0 28px 8px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.drawer.up',
          defaults: {
            dark: '0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            light:
              '0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.drawer.down',
          defaults: {
            dark: '0 -6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 -3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 -9px 28px 8px rgba(0, 0, 0, 0.05)',
            light:
              '0 -6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 -3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 -9px 28px 8px rgba(0, 0, 0, 0.05)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.tabs.overflow.left',
          defaults: {
            dark: 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)',
            light: 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.tabs.overflow.right',
          defaults: {
            dark: 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)',
            light: 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.tabs.overflow.top',
          defaults: {
            dark: 'inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)',
            light: 'inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)',
          },
          description: '',
        },

        {
          id: 'ant.box.shadow.tabs.overflow.bottom',
          defaults: {
            dark: 'inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)',
            light: 'inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)',
          },
          description: '',
        },
      ],
    );
  }
}
