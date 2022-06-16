import { extendTheme } from "@chakra-ui/react"
import ReactPDF from "@react-pdf/renderer"

import { clientProps } from "@styles/ClientStyle"


export type clientType = "aha" | "bsr" | "shr" | undefined


//COLORS PALETTE
const colors = {

    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray:
    {
        50: '#eff2f5',
        100: '#d4d7dc',
        200: '#b7bdc5',
        300: '#99a3b0',
        400: '#7b889b',
        500: '#626f82',
        600: '#4c5665',
        700: '#373e48',
        800: '#21252b',
        900: '#0a0c10',
    },

    ...clientProps.colors
}
// PRIMARY THEME COLORS
export const themeColors = {

    background: {
        body: colors.secondary[200],
        active: colors.primary[30],
        highlight: colors.primary[700],
        dark: colors.gray[50]
    },
    signs: {
        lighter: colors.gray[50],
        light: colors.gray[100],
        normal: colors.gray[200],
        dark: colors.gray[600],
    },
    highlight: {
        signal: colors.secondary[50],
        lighter: colors.primary[50],
        light: colors.primary[200],
        normal: colors.primary[500],
        dark: colors.primary[600],
        darker: colors.primary[700],
    }
}

//PRIMARY FONTS
const themeFonts = {
    body: `${clientProps.font.fontPrimary}, Roboto, system-ui, sans-serif`,
    heading: `${clientProps.font.fontPrimary}, Roboto, system-ui, sans-serif`,

    buttons: { fontSize: "sm", fontWeight: "normal" }
}

//PRIMARY CHAKRA SHADOW
const themeShadow = {
    normal: "md",
    large: "lg",
}

//PRIMARY BORDER
export const themeBorder = {
    radius: "0.5em",
    divider: {
        borderBottom: "1px",
        borderColor: themeColors.signs.lighter,
    },
    border: `1px solid ${themeColors.signs.lighter}`,
    // dividerDark: {
    //     borderBottom: "1px",
    //     // borderColor: themeColors.signs.normal,
    // }
}

// PRIMARY MARGINS
const themeMargins = {
    frame: "1.2em",
    halfFrame: "0.6em",
}

// PRIMARY BUTTON
const defaultThemeButton = {

    baseStyle: {

        fontWeight: themeFonts.buttons.fontWeight,
        fontSize: themeFonts.buttons.fontSize,
        bg: themeColors.background.dark,
        borderRadius: themeBorder.radius,
        _focus: { boxShadow: 'none', _focus: "none" },
        _hover: {
            color: colors.white,
            bg: themeColors.background.highlight,
        },
        //}
    },

    variants: {
        ghost: {
            bg: colors.transparent,
            color: themeColors.signs.dark,
            _hover: {
                color: themeColors.highlight.darker,
                bg: themeColors.background.active,
            },
        },
        strong: {
            color: colors.white,
            bg: themeColors.highlight.darker,
        },

    }
}

// PRIMARY LAYOUT ELEMENTS

const colorField = {
    bg: themeColors.background.active,
}

export const tabs = {
    variant: "enclosed",
    color: themeColors.background.active
}

export const focus = {
    focus: themeColors.highlight.normal,
}

export const defaultInputField = {

    baseStyle: {


        bg: 'red',
        borderRadius: themeBorder.radius,
        boxShadow: `0 6px 15px 0 rgba(0, 0, 0, 0.08)`,
        _focus: {},
        _hover: {


        },

    },
}

// TEXT SETTINGS

export const themeTextStyles = {

    h2: {
        fontWeight: 600,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontBold}`,
        lineHeight: 1.5,

    },

    h4: {
        fontWeight: 600,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontSecondary}`,
        lineHeight: 1.5,

    },
    p: {
        fontWeight: 300,
        fontSize: 18,
        lineHeight: 1.2,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontPrimary}`,

    },
}


export const pdfTextStyles: ReactPDF.Styles = {
    h2: {
        fontWeight: 600,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontPrimary}`,
        marginBottom: 8,
        lineHeight: 1.5,
        color: themeColors.signs.normal
    },

    h4: {
        fontWeight: 600,
        fontSize: 12,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontSecondary}`,
        lineHeight: 1.5,
        color: themeColors.signs.dark
    },
    p: {
        fontWeight: 300,
        fontSize: 12,
        lineHeight: 1.2,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontPrimary}`,
        color: themeColors.signs.dark

    },
    alignRight: {
        textAlign: 'right',
    },

    capitalize: {
        textTransform: 'capitalize',
    },
}

export const pdfStyle: ReactPDF.Styles = {

    link: {
        textDecoration: "underline"
    },

    image: {
        objectFit: "imageFit",
        height: "40px",
        width: "40px",
    },

    borderBottom: {
        borderBottom: "1px solid #4c5665"
    },

    // Flex layout 

    flexWrap: { flexWrap: "wrap" }, //work only without flex basis. issue: https://github.com/diegomura/react-pdf/issues/416
    flexNoWrap: { flexWrap: "nowrap" },

    flexJustifyBottom: { justifyContent: "flex-end" },
    flexJustifySpace: { justifyContent: "space-between" },

    flexRow: {
        // border: "1px solid red",
        display: "flex",
        flexDirection: "row",
    },
    flexColumn: {
        // border: "1px solid green",
        display: "flex",
        flexDirection: "column",
    },
    flexSize20: {
        justifyContent: "flex-start",
        flexGrow: 1,
        flexShrink: 1,
        width: "20%",
        display: "flex",
    },
    flexSize50: {
        justifyContent: "flex-start",
        flexGrow: 1,
        flexShrink: 1,
        width: "50%",
        display: "flex",
    },
    flexSize100: {
        justifyContent: "flex-start",
        flexGrow: 1,
        flexShrink: 1,
        width: "100%",
        display: "flex",
    },
    flexSizeAuto: {
        justifyContent: "flex-start",
        flexGrow: 1,
        flexShrink: 1,
        display: "flex",
    },
    flexSizeAutoMax: {
        justifyContent: "flex-start",
        flexGrow: 99,
        flexShrink: 1,
        display: "flex",
    },
    padding: {
        paddingBottom: "5pt",
        paddingTop: "5pt",
        paddingLeft: "5pt",
        paddingRight: "5pt",
    },

    pagePadding: {
        paddingLeft: "25pt",
        paddingRight: "25pt",
        paddingBottom: "35pt",
        paddingTop: "25pt",
    },

    footer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexGrow: 0,
        flexShrink: 1,
        height: "5%",
        display: "flex",

        position: 'absolute',
        marginTop: 4,

        bottom: '20pt',
        left: '25pt',
        right: '25pt',
    },

    logo: {
        justifyContent: "flex-end",
        marginRight: 4,
        marginLeft: 4,
        marginBottom: 4,
        flexGrow: 0,
        flexShrink: 1,
        display: "flex",
    },


    posAbsolute: {
        position: 'absolute'
    },

    posRelative: { position: "relative" },

};



export const emailTextStyles = {
    h2: {
        fontWeight: 600,
        fontSize: 25,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontSecondary}`,
        marginBottom: 8,
        lineHeight: 1.5,
        color: themeColors.signs.dark
    },

    h4: {
        fontWeight: 600,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontSecondary}`,
        lineHeight: 1.5,
        color: themeColors.signs.dark
    },
    p: {
        fontWeight: 300,
        fontSize: 16,
        lineHeight: 1.5,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontPrimary}`,
        color: themeColors.signs.dark

    },
    a: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 1.5,
        textAlign: 'left',
        fontFamily: `${clientProps.font.fontPrimary}`,
        color: themeColors.highlight.darker

    },

}

export const theme = extendTheme({


    // CLIENT GLOBAL

    client: clientProps.client,
    clientProps: clientProps,
    //PRIMARY COLORS
    themeColors: themeColors,
    colors: themeColors,

    //PRIMARY FONT
    fonts: {
        body: themeFonts.body,
        heading: themeFonts.heading
    },
    themeFonts: themeFonts,



    ///     STYLES      ///

    layerStyles: {

        //BACKGROUNDS
        colorField: {
            ...(clientProps?.colorField ?? colorField)
        },
        grayField: { bg: themeColors.background.dark },

        shadowField: {
            
            boxShadow: `0 3px 7px 0 rgba(0, 0, 0, 0.08)`,
            _hover:{ boxShadow: `0 6px 15px 0 rgba(0, 0, 0, 0.08)` }
        },
        //OFFSETS

        frame: {
            padding: themeMargins.frame,
        },
        halfFrame: {
            padding: themeMargins.halfFrame,
        },
        frameTop: {
            paddingTop: themeMargins.halfFrame,
        },
        frameBottom: {
            paddingBottom: themeMargins.halfFrame,
        },
        frameLeft: {
            paddingLeft: themeMargins.halfFrame,
        },
        frameRight: {
            paddingRight: themeMargins.halfFrame,
        },
        // BORDERS
        borderRadius: {
            borderRadius: themeBorder.radius,
        },
        divider: {
            ...themeBorder.divider
        }
    },

    // TEXT
    pdfTextStyles: {
        ...pdfTextStyles
    },


    emailTextStyles: emailTextStyles,

    // BORDER

    border: {
        ...themeBorder
    },


    // LAYOUT ELEMENTS
    tabs: { ...(clientProps?.tabs ?? tabs) },

    focus: { ...(clientProps?.focus ?? focus) },



    // COMPONETS STYLES

    components: {

        // BUTTONS 
        Button: {
            ...(clientProps?.buttons ?? defaultThemeButton)

        },
        IconButton: {

            ...(clientProps?.buttons ?? defaultThemeButton)
        },
        ButtonGroup: {

            ...(clientProps?.buttons ?? defaultThemeButton)
        },
        Text: {
            variants: {
                ...themeTextStyles
            }
        },
        NumberInput: {
            ...(defaultInputField)
        }


    }
});

