const plugin = require('tailwindcss/plugin');
const postcss = require('postcss');
const postcssJs = require('postcss-js');

const clampGenerator = require('./src/css-utils/clamp-generator.js');
const tokensToTailwind = require('./src/css-utils/tokens-to-tailwind.js');

// Raw design tokens
const colorTokens = require('./src/design-tokens/colors.json');
const fontTokens = require('./src/design-tokens/fonts.json');
const spacingTokens = require('./src/design-tokens/spacing.json');
const textSizeTokens = require('./src/design-tokens/text-sizes.json');

// Process design tokens
const colors = tokensToTailwind(colorTokens.items);
const fontFamily = tokensToTailwind(fontTokens.items);
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items));
const spacing = tokensToTailwind(clampGenerator(spacingTokens.items));

module.exports = {
  content: ['./src/**/*.{html,js,jsx,mdx,njk,twig,vue}'],
  presets: [],
  theme: {
    screens: {
      sm: '32em',
      md: '48em',
      lg: '64em',
      menu: '70em',
      xl: '80em',
      '2xl': '1600px',
    },
    colors,
    spacing,
    fontSize,
    fontFamily,
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
      black: 800,
    },
    backgroundColor: ({ theme }) => theme('colors'),
    textColor: ({ theme }) => theme('colors'),
    margin: ({ theme }) => ({
      auto: 'auto',
      0: '0',
      ...theme('spacing'),
    }),
    padding: ({ theme }) => ({
      0: '0',
      ...theme('spacing'),
    }),
    width: ({ theme }) => ({
      auto: 'auto',
      full: '100%',
      75: '75%',
      50: '50%',
      ...theme('spacing'),
    }),
    height: ({ theme }) => ({
      auto: 'auto',
      full: '100%',
      ...theme('spacing'),
    }),
    gap: ({ theme }) => theme('spacing'),
    inset: ({ theme }) => ({
      auto: 'auto',
      0: '0',
      ...theme('spacing'),
    }),
    scrollMargin: ({ theme }) => ({
      ...theme('spacing'),
    }),
    boxShadow: {
      md: '2px 2px 14px 0 rgba(0,0,0,0.12)',
    },
    decoration: {
      light: '#ffffff',
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },
    aspectRatio: {
      square: '1 / 1',
      video: '16 / 9',
      '3/2': '3 / 2',
      '2/3': '2 / 3',
      '4/3': '4 / 3',
      '3/4': '3 / 4',
      '5/4': '5 / 4',
    },
    textUnderlineOffset: ({ theme }) => ({
      ...theme('spacing'),
    }),
    backgroundOpacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      80: '0.8',
      90: '0.9',
    },
  },
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'empty',
    'read-only',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled',
  ],

  // Disables Tailwind's reset etc
  corePlugins: {
    preflight: false,
  },
  plugins: [
    // Generates custom property values from tailwind config
    plugin(({ addComponents, config }) => {
      let result = '';

      const currentConfig = config();

      const groups = [
        { key: 'colors', prefix: 'color' },
        { key: 'spacing', prefix: 'space' },
        { key: 'fontSize', prefix: 'size' },
        { key: 'fontFamily', prefix: 'font' },
      ];

      groups.forEach(({ key, prefix }) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach((key) => {
          result += `--${prefix}-${key}: ${group[key]};`;
        });
      });

      addComponents({
        ':root': postcssJs.objectify(postcss.parse(result)),
      });
    }),

    // Generates custom utility classes
    plugin(({ addUtilities, config }) => {
      const currentConfig = config();
      const customUtilities = [
        { key: 'spacing', prefix: 'flow-space', property: '--flow-space' },
        { key: 'colors', prefix: 'spot-color', property: '--spot-color' },
      ];

      customUtilities.forEach(({ key, prefix, property }) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach((key) => {
          addUtilities({
            [`.${prefix}-${key}`]: postcssJs.objectify(
              postcss.parse(`${property}: ${group[key]}`),
            ),
          });
        });
      });
    }),
  ],
};
