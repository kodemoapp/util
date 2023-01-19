import { blue, indigo } from '@radix-ui/colors';
import Color from 'color';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    /**
     * The height of the subjects tab bar
     */
    tabHeight: number;

    /**
     * The height of the subjects tab bar on small screens.
     */
    tabHeightSmall: number;

    /**
     * Optional rounding for the top left corner of the subjects tab bar.
     */
    tabBarTopLeftRadius: number;

    /**
     * Optional rounding for the top right corner of the subjects tab bar.
     */
    tabBarTopRightRadius: number;

    /**
     * Horizontal padding to use around the story, in pixels.
     */
    storyPaddingH: number;

    /**
     * Vertical padding to use around the story, in pixels.
     */
    storyPaddingV: number;

    /**
     * The CSS height to use for subjects on small screens.
     */
    subjectsMobileHeight: string;

    colors: {
      brand: string;
      brandAccentDark: string;
      bgPage: string;
      bgStory: string;
      bgSubjects: string;
      bgSubjectsDarker: string;
      bgHighlightOverlay: string;
      bgInactiveEffect: string;
      text: string;
      textSlightlyFaded: string;
      textVeryFaded: string;
      link: string;
      linkOver: string;
      active: string;
      connections: string;
    };

    breakpointsInPixels: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
    };

    breakpoints: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };

    fontSize: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };

    rounding: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };

    ease: {
      [key: string]: string;
    };
  }
}

const mainBg = '#1e2127';

export const theme: DefaultTheme = {
  tabHeight: 40,
  tabHeightSmall: 30,

  tabBarTopLeftRadius: 0,
  tabBarTopRightRadius: 0,

  storyPaddingH: 28,
  storyPaddingV: 28,

  subjectsMobileHeight: '40vh',

  colors: {
    brand: '#f4e23f',
    brandAccentDark: '#0a0a26',
    bgPage: '#f2f2f9',
    bgStory: '#fff',
    bgSubjects: mainBg,
    bgSubjectsDarker: Color(mainBg)!.darken(0.15).hexa(),
    bgHighlightOverlay: Color(mainBg)!.alpha(0.8).hexa(),
    bgInactiveEffect: '#e8ebf2',
    text: '#000',
    textSlightlyFaded: '#848489',
    textVeryFaded: '#bcbcc8',
    link: indigo.indigo11,
    linkOver: indigo.indigo9,
    active: '#4677ff',
    connections: '#4677ff',
  },

  breakpointsInPixels: {
    xs: 400,
    s: 700,
    m: 1000,
    l: 1300,
    xl: 1600,
  },

  breakpoints: {
    xs: '(max-width: 400px)',
    s: '(max-width: 700px)',
    m: '(max-width: 1000px)',
    l: '(max-width: 1300px)',
    xl: '(max-width: 1600px)',
  },

  fontSize: {
    xs: '11px',
    s: '13px',
    m: '14px',
    l: '16px',
    xl: '18px',
  },

  rounding: {
    xs: '1px',
    s: '2px',
    m: '4px',
    l: '8px',
    xl: '16px',
  },

  ease: {
    outQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  },
};

export type Theme = typeof theme;
export type ThemePartial = Partial<Theme>;
