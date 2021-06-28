import WorkSansTTF from "../assets/fonts/WorkSans-VariableFont_wght.ttf";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const WorkSans = {
  fontFamily: "Work Sans Thin",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Work Sans Thin'),
    local('Work Sans Thin'),
    url(${WorkSansTTF}) format('truetype')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export const colors = {
  white: "#fff",
  black: "#000",
  darkBlue: "#2c3b57",
  blue: "#2F80ED",
  gray: "#e1e1e1",
  lightGray: "#737373",
  lightBlack: "#6a6a6a",
  darkBlack: "#141414",
  green: "#1abc9c",
  red: "#ed4337",
  orange: "orange",
  pink: "#DC6BE5",
  compoundGreen: "#00d395",
  tomato: "#e56b73",
  purple: "#935dff",
  yellow: "#FFBF41",
  text: "#212529",
  lightBlue: "#2F80ED",
  topaz: "#0b8f92",
  darkGray: "rgba(43,57,84,.5)",
  borderBlue: "rgba(25, 101, 233, 0.5)",
};

const colorObj = {
  dark: {
    // 以前的部分(为了兼容)
    white: "#fff",
    black: "#000",
    darkBlue: "#2c3b57",
    blue: "#2F80ED",
    gray: "#e1e1e1",
    lightGray: "#737373",
    lightBlack: "#6a6a6a",
    darkBlack: "#141414",
    green: "#1abc9c",
    red: "#ed4337",
    orange: "orange",
    pink: "#DC6BE5",
    compoundGreen: "#00d395",
    tomato: "#e56b73",
    purple: "#935dff",

    text: "#212529",
    lightBlue: "#2F80ED",
    topaz: "#0b8f92",
    darkGray: "rgba(43,57,84,.5)",
    borderBlue: "rgba(25, 101, 233, 0.5)",

    // 新的部分
    back: "linear-gradient(180deg, #201D47 0%, #17153A 100%)",
    sidbarBack: "linear-gradient(180deg, #201D47 0%, #17153A 100%)",
    modelBack:
      "linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)",
    textT: "#ffffff",
    textP: "#7367F7",
    textS: "#7B25D2",
    textH: "#027AFF",
    textD: "rgba(115, 103, 247, 0.4)",
    lineO: "rgba(255, 255, 255, 0.2)",
    lineT: "rgba(255, 255, 255, 0.1)",
    border: "#7367F7",
    borderH: "#180C4B",
    borderA: "#0E0632",
    borderD: "rgba(115, 103, 247, 0.4)",
    form: "rgba(255, 255, 255, 0.1)",
    formH: "rgba(0, 0, 0, 0.2)",
    formWarning: "#ff6700",
    formError: "#DC0B0C",
    formD: "rgba(115, 103, 247, 0.4)",

    // 后补充
    blockBack: "rgba(255, 255, 255, 0)",
    blockBorder: "#7367F7",
    blockTextColor: "#7367F7",
    menuSel:
      "linear-gradient(90deg, #15023A 0%, rgba(12, 2, 32, 0.03) 100%, rgba(11, 2, 30, 0) 100%)",
    tagBack: "rgba(0, 0, 0, 0.4)",
    iconGray: "#655F7F",
    itemBack: "#211F4B",
    tooltipBack: "#12032F",
    inputBack: "rgba(0,0,0,0.2)",
    tradeBack: "rgba(0,0,0,0.1)",
    textZ: "#7367F7",
    menuSelText: "#ffffff",
    btnBack: "#180C4B",
    btnDisabled: "rgba(115, 103, 247, 0.4)",
    walletSelectBg: "#23204f",
    walletSelectBorder: "#7367f7",
    totalValue: "rgba(21,2,59,0.7)",
    silderBoxShadow: "0px 0px 30px #15023B",
    sliderLight: "#201D47",
    stakeTextBg: "rgba(110,103,247,1)",
    stakeTextText: "#FFFFFF",
    myAssetsRateText: "rgba(255,255,255,.6)",
    contactUsText: "#7367F7",
    buttonDeauflt: "#180C4B",
    buttonActive: "#7367F7",
    // stake
  },
  light: {
    // 以前的部分(为了兼容)
    white: "#fff",
    black: "#000",
    darkBlue: "#2c3b57",
    blue: "#2F80ED",
    gray: "#e1e1e1",
    lightGray: "#737373",
    lightBlack: "#6a6a6a",
    darkBlack: "#141414",
    green: "#1abc9c",
    red: "#ed4337",
    orange: "orange",
    pink: "#DC6BE5",
    compoundGreen: "#00d395",
    tomato: "#e56b73",
    purple: "#935dff",

    text: "#212529",
    lightBlue: "#2F80ED",
    topaz: "#0b8f92",
    darkGray: "rgba(43,57,84,.5)",
    borderBlue: "rgba(25, 101, 233, 0.5)",

    // 新的部分
    back: "#F1F3F9",
    sidbarBack: "#F8F9FC",
    modelBack: "#F8F9FC",
    textT: "#000000",
    textP: "#AEACB6",
    textS: "#7B25D2",
    textH: "#027AFF",
    textD: "rgba(115, 103, 247, 0.4)",
    lineO: "rgba(0, 0, 0, 0.2)",
    lineT: "rgba(0, 0, 0, 0.1)",
    border: "#7367F7",
    borderH: "#7367F7",
    borderA: "#7367F7",
    borderD: "rgba(115, 103, 247, 0.4)",
    form: "rgba(0, 0, 0, 0.1)",
    formH: "#7367F7",
    formWarning: "#ff6700",
    formError: "#DC0B0C",
    formD: "rgba(115, 103, 247, 0.4)",

    // 后补充
    blockBack: "#ffffff",
    // blockBorder: '#EEF0F8',
    blockBorder: "rgba(0, 0, 0, 0.1)",
    blockTextColor: "#AEACB6",
    menuSel: "linear-gradient(90deg, #EEF0F8 0%, #F8F9FC 100%)",
    tagBack: "#ffffff",
    iconGray: "#AEACB6",
    itemBack: "#F8F9FC",
    tooltipBack: "#F8F9FC",
    inputBack: "#F8F9FC",
    tradeBack: "#ffffff",
    textZ: "#000000",
    menuSelText: "#104FD8",
    btnBack: "rgba(115, 103, 247, 0.2)",
    btnDisabled: "rgba(115, 103, 247, 0.4)",
    walletSelectBg: "#ffffff",
    walletSelectBorder: "rgba(0, 0, 0, 0.1)",
    totalValue: "#ffffff",
    silderBoxShadow: "0px 0px 30px rgba(0,0,0,.2)",
    sliderLight: "#F1F3F9",
    stakeTextBg: "rgba(110,103,247,1)",
    stakeTextText: "#FFFFFF",
    myAssetsRateText: "rgba(0,0,0,.6)",
    contactUsText: "#000000",
    buttonDeauflt: "#180C4B",
    buttonActive: "rgba(115,103,247,.2)",
  },
};

const breakpoints = createBreakpoints({
  keys: ["xs", "sm", "md", "lg", "xl"],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800,
  },
});

export const drawerWidth = 245;

const iswapTheme = {
  typography: {
    fontFamily: [
      '"Work Sans Thin"',
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "48px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "36px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "22px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "16px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "14px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "16px",
      fontWeight: "300",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    body2: {
      fontSize: "16px",
      fontWeight: "300",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  },
  type: "light",
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [WorkSans],
      },
    },
    MuiSelect: {
      select: {
        padding: "9px",
      },
      selectMenu: {
        minHeight: "30px",
        display: "flex",
        alignItems: "center",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "50px",
        padding: "10px 24px",
      },
      outlined: {
        padding: "10px 24px",
        borderWidth: "2px !important",
      },
      text: {
        padding: "10px 24px",
      },
      label: {
        textTransform: "none",
        fontSize: "1rem",
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          //underline color when textfield is inactive
          display: "none !important",
          height: "0px",
          borderBottom: "none !important",
        },
        "&:after": {
          //underline color when textfield is inactive
          display: "none !important",
          height: "0px",
          borderBottom: "none !important",
        },
        "&:hover:not($disabled):before": {
          //underline color when hovered
          display: "none !important",
          height: "0px",
          borderBottom: "none !important",
        },
      },
    },
    MuiInputBase: {
      input: {
        fontSize: "16px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
    },
    MuiOutlinedInput: {
      input: {
        "&::placeholder": {
          color: colors.text,
        },
        color: colors.text,
        padding: "14px",
        borderRadius: "10px",
      },
      root: {
        // border: "none !important",
        borderRadius: "10px",
      },
      notchedOutline: {
        // border: "none !important"
      },
    },
    MuiSnackbar: {
      root: {
        maxWidth: "calc(100vw - 24px)",
      },
      anchorOriginBottomLeft: {
        bottom: "12px",
        left: "12px",
        "@media (min-width: 960px)": {
          bottom: "50px",
          left: "80px",
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: colors.white,
        padding: "0px",
        minWidth: "auto",
        "@media (min-width: 960px)": {
          minWidth: "500px",
        },
      },
      message: {
        padding: "0px",
      },
      action: {
        marginRight: "0px",
      },
    },
    MuiAccordion: {
      root: {
        border: "1px solid #d9d9d9",
        borderRadius: "10px",
        margin: "16px 0px 8px",
        "&:before": {
          //underline color when textfield is inactive
          backgroundColor: "none",
          height: "0px",
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: "12px 24px",
        "@media (min-width: 960px)": {
          padding: "16px 25px",
        },
      },
      content: {
        margin: "0px !important",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "0 12px 15px 12px",
        "@media (min-width: 960px)": {
          padding: "0 24px 30px 24px",
        },
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: "50px",
        textTransform: "none",
        minWidth: "100px",
        border: "none",
        background: colors.white,
        "& > span > h4": {
          color: "#555",
        },
        "&:hover": {
          backgroundColor: "rgba(47,128,237, 0.2)",
        },
        "&$selected": {
          backgroundColor: "#2f80ed",
          "& > span > h4": {
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "rgba(47,128,237, 0.2)",
            "& > span > h4": {
              color: "#000",
            },
          },
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
    },
    MuiToggleButtonGroup: {
      root: {
        border: "1px solid " + colors.borderBlue,
        borderRadius: "50px",
      },
      groupedSizeSmall: {
        padding: "42px 30px",
      },
    },
    MuiFormControlLabel: {
      label: {
        color: colors.darkBlack,
        fontSize: "14px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
    },
  },
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.topaz,
    },
    text: {
      primary: colors.text,
      secondary: colors.text,
    },
  },
  breakpoints: breakpoints,
};

export default iswapTheme;

export function getTheme(currentTheme = "light") {
  const colors = colorObj[currentTheme];
  const iswapTheme = {
    typography: {
      fontFamily: [
        '"Work Sans Thin"',
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h1: {
        fontSize: "48px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "36px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
      h3: {
        fontSize: "22px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
      h4: {
        fontSize: "16px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
      h5: {
        fontSize: "14px",
        fontWeight: "600",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
      },
      body1: {
        fontSize: "16px",
        fontWeight: "300",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      body2: {
        fontSize: "16px",
        fontWeight: "300",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
    },
    type: "light",
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [WorkSans],
        },
      },
      MuiSelect: {
        select: {
          padding: "9px",
        },
        selectMenu: {
          minHeight: "30px",
          display: "flex",
          alignItems: "center",
        },
      },
      MuiButton: {
        root: {
          borderRadius: "50px",
          padding: "10px 24px",
        },
        outlined: {
          padding: "10px 24px",
          borderWidth: "2px !important",
        },
        text: {
          padding: "10px 24px",
        },
        label: {
          textTransform: "none",
          fontSize: "1rem",
        },
      },
      MuiInput: {
        underline: {
          "&:before": {
            //underline color when textfield is inactive
            display: "none !important",
            height: "0px",
            borderBottom: "none !important",
          },
          "&:after": {
            //underline color when textfield is inactive
            display: "none !important",
            height: "0px",
            borderBottom: "none !important",
          },
          "&:hover:not($disabled):before": {
            //underline color when hovered
            display: "none !important",
            height: "0px",
            borderBottom: "none !important",
          },
        },
      },
      MuiInputBase: {
        input: {
          fontSize: "16px",
          fontWeight: "600",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.2,
        },
      },
      MuiOutlinedInput: {
        input: {
          "&::placeholder": {
            color: colors.text,
          },
          color: colors.text,
          padding: "14px",
          borderRadius: "10px",
        },
        root: {
          // border: "none !important",
          borderRadius: "10px",
        },
        notchedOutline: {
          // border: "none !important"
        },
      },
      MuiSnackbar: {
        root: {
          maxWidth: "calc(100vw - 24px)",
        },
        anchorOriginBottomLeft: {
          bottom: "12px",
          left: "12px",
          "@media (min-width: 960px)": {
            bottom: "50px",
            left: "80px",
          },
        },
      },
      MuiSnackbarContent: {
        root: {
          backgroundColor: colors.white,
          padding: "0px",
          minWidth: "auto",
          "@media (min-width: 960px)": {
            minWidth: "500px",
          },
        },
        message: {
          padding: "0px",
        },
        action: {
          marginRight: "0px",
        },
      },
      MuiAccordion: {
        root: {
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          margin: "16px 0px 8px",
          "&:before": {
            //underline color when textfield is inactive
            backgroundColor: "none",
            height: "0px",
          },
        },
      },
      MuiAccordionSummary: {
        root: {
          padding: "12px 24px",
          "@media (min-width: 960px)": {
            padding: "16px 25px",
          },
        },
        content: {
          margin: "0px !important",
        },
      },
      MuiAccordionDetails: {
        root: {
          padding: "0 12px 15px 12px",
          "@media (min-width: 960px)": {
            padding: "0 24px 30px 24px",
          },
        },
      },
      MuiToggleButton: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          minWidth: "100px",
          border: "none",
          background: colors.white,
          "& > span > h4": {
            color: "#555",
          },
          "&:hover": {
            backgroundColor: "rgba(47,128,237, 0.2)",
          },
          "&$selected": {
            backgroundColor: "#2f80ed",
            "& > span > h4": {
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "rgba(47,128,237, 0.2)",
              "& > span > h4": {
                color: "#000",
              },
            },
          },
        },
      },
      MuiPaper: {
        elevation1: {
          boxShadow: "none",
        },
      },
      MuiToggleButtonGroup: {
        root: {
          border: "1px solid " + colors.borderBlue,
          borderRadius: "50px",
        },
        groupedSizeSmall: {
          padding: "42px 30px",
        },
      },
      MuiFormControlLabel: {
        label: {
          color: colors.darkBlack,
          fontSize: "14px",
          fontWeight: "600",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.2,
        },
      },
    },
    palette: {
      primary: {
        main: colors.blue,
      },
      secondary: {
        main: colors.topaz,
      },
      text: {
        primary: colors.text,
        secondary: colors.text,
      },
    },
    breakpoints: breakpoints,
    themeColors: colors,
  };
  return iswapTheme;
}
