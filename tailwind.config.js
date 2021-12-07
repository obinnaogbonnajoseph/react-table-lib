module.exports = {
  purge: {
    content: ["./src/**/*.{html, css, js}", "./src/**/*.js", "./src/**/*.html", "./src/**/*.css"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    colors: {
      /*
      * IMPORTANT
      * Any time you edit this list; do the same thing in common module model
      */
      transparent: "transparent",
      current: "currentColor",

      neutral: {
        100: "#FFFFFF",
        DEFAULT: "#FFFFFF",
        200: "#F9F9F9",
        300: "#F5F5F5",
        400: "#E6E6E6",
        500: "#C3BFBF",
        600: "#A0A0A0",
        700: "#7C7C7C",
        800: "#000000",
      },
      green: {
        50: "#EAFDF0",
        100: "#82FFAE",
        200: "#68FF94",
        300: "#4FE67B",
        DEFAULT: "#35CC61",
        400: "#35CC61",
        500: "#1CB348",
      },
      bluewood: {
        50: "#E8F2FF",
        100: "#B3BCC7",
        200: "#667A8E",
        300: "#4D6175",
        DEFAULT: "#33475B",
        400: "#33475B",
        500: "#001428",
      },
      purple: {
        100: "#D8D7E4",
        200: "#635D95",
        300: "#4A447C",
        DEFAULT: "#302A62",
        400: "#302A62",
        500: "#171149",
      },
      brown: {
        100: "#F1DFD4",
        200: "#C78053",
        300: "#AE673A",
        DEFAULT: "#944D20",
        400: "#944D20",
        500: "#7B3407",
      },
      yellow: {
        100: "#FFFABC",
        200: "#FFF579",
        300: "#F8C246",
        DEFAULT: "#F8C246",
        400: "#DFA92D",
      },
      red: {
        100: "#FFAAAA",
        200: "#FF3B6B",
        300: "#FF0838",
        DEFAULT: "#FF0838",
        400: "#CC0005",
      },
    },
    spacing: {
      0: "0px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      20: "20px",
      24: "24px",
      28: "28px",
      30: "30px",
      32: "32px",
      36: "36px",
      40: "40px",
      44: "44px",
      46: "46px",
      48: "48px",
      50: "50px",
      56: "56px",
      64: "64px",
      72: "72px",
      90: "90px",
      360: "360px"
    },
    borderRadius: (theme) => ({
      none: "none",
      full: "100%",
      ...theme("spacing"),
    }),
    boxShadow: {
      none: "none",
      "blur-4": "0px 4px 8px rgba(0, 0, 0, 0.1)",
      "blur-8": "0px 8px 20px rgba(0, 0, 0, 0.1)",
      fab: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    },
    backgroundImage: {
      none: "none",
      "gradient-gruple": "linear-gradient(102.85deg, #00D558 -8.44%, #342165 96.87%)",
      "gradient-green": "linear-gradient(90deg, #1CB348 0%, #4FE67B 100%)",
      "gradient-purple": "linear-gradient(90deg, #171149 0%, #4A447C 100%)",
    },
    fontFamily: {
      "baloo-bhai": ['"Baloo Bhai"'],
      rubik: ["Rubik-regular"],
      "rubik-medium": ["Rubik-medium"],
      "rubik-bold": ["Rubik-bold"],
      "rubik-light": ["Rubik-light"],
    },
    fontSize: {
      "ti-1": ["48px", "56px"],
      "ti-2": ["32px", "36px"],
      "ti-3": ["24px", "30px"],
      "ti-4": ["20px", "24px"],
      "ti-5": ["18px", "22px"],
      "ti-6": ["16px", "20px"],
      "h-1": ["24px", "30px"],
      "h-2": ["20px", "26px"],
      "h-3": ["18px", "26px"],
      "h-4": ["16px", "24px"],
      "s-1": ["16px", "24px"],
      "s-2": ["15px", "22px"],
      "b-1-bold": ["14px", "22px"],
      "b-1": ["14px", "22px"],
      "b-2": ["13px", "21px"],
      "caption-fnt": ["12px", "20px"],
      "input-fnt": ["12px", "14px"],
      "btn-1-fnt": ["16px", "19px"],
      "btn-2-fnt": ["14px", "17px"],
      "btn-3-fnt": ["12px", "14px"],
      "link-fnt": ["14px", "17px"],
      "tag-fnt": ["11px", "13px"],
    },
    extend: {
      gridTemplateColumns: {
        giphy: "repeat(auto-fill, 100px)",
      },
      gridAutoRows: {
        giphy: "100px",
      },
      borderWidth: {
        1: "1px",
        '1x5': "1.5px"
      }
    },
  },
  variants: {
    extend: {
      textColor: ["active", "disabled"],
      textDecoration: ["active"],
      backgroundColor: ["disabled", "active"],
      borderColor: ["disabled", "active"],
      boxShadow: ["active"],
      placeholderColor: ["disabled"]
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [
    require('./tailwind-plugins/control-plugins'),
    require('./tailwind-plugins/box-shadow-plugins')
  ]
};
