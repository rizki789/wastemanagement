import { clientType } from "@components/utils/GlobalTheme"
import {
    StyleSheet,
} from '@react-pdf/renderer';


export const client: clientType = "shr"

//  styles

export const clientColors = {

    primary:

    //Shr Manual 
    {
        30: '#ffd3c8',
        50: '#ffab95',
        100: '#ff977b',
        200: '#ff5b00',
        300: '#ff5b00',
        400: '#ff5b00', //button base shr
        500: '#cc4900',
        600: '#993700',
        700: '#ff5b00',//button base shr


    },
    secondary:

    {
        50: 'blue',
        100: 'blue',
        200: 'blue',
        300: 'blue',
        400: 'blue',
        500: 'blue',
        600: 'blue',
        700: 'blue',
    }
}

// font-family: Arial;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.4;
// 	color: #000;

const clientFonts = {

    fontPrimary: 'Arial',

    fontSecondary: 'Arial',

    fontBold: 'Arial',

}

export const clientBorders = {
    radius: "6px"
}
export const colorField = {
    bg: '#fff',

}

export const focus = {
    boxShadow: ` 0 0 0 2px #fff, 0 0 0 4px #ff5b00, 0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
}


export const clientButtons = {

    baseStyle: {

        fontFamily: clientFonts.fontBold,
        fontWeight: 600,
        color: '#fff',
        fontSize: "1em",
        bg: '#e13000',
        borderRadius: clientBorders.radius,
        boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
        _focus: {
            boxShadow: "none",

        },
        _hover: {
            boxShadow: ' 0 6px 15px 0 rgba(0, 0, 0, 0.08)',
            bg: '#a92400',
        },
        // _pressed: {
        //     bg: '#711800',
        // },

        //}
    },


    variants: {
        ghost: {

            border: 'solid 1px #cfd2d7',
            backgroundColor: '#fff',
            color: '#4c5665',
            _hover: {

                boxShadow: ' 0 6px 15px 0 rgba(0, 0, 0, 0.08)',
                border: 'solid 1px #ff5b00',
                color: '#ff5b00',
            },

            // _focus: {
            //      boxShadow: focus.boxShadow,
            //     border: 'solid 1px #d1d5db',
            // },


            //     },
            //     strong: {
            //         color: colors.white,
            //         bg: themeColors.highlight.darker,
            //     },

        }

    }

}


export const clientStyles = StyleSheet.create({

    ahaPadding: {
        paddingLeft: "30pt",
        paddingRight: "30pt",
        paddingBottom: "35pt",
    },

    logoAha: {
        justifyContent: "flex-end",
        flexGrow: 0,
        flexShrink: 1,
        height: "70pt",
        width: "70pt",

        display: "flex",
        bottom: '40pt',
        right: '25pt',

    },

    logoTextAha: {
        justifyContent: "flex-end",
        flexGrow: 0,
        flexShrink: 1,

        display: "flex",

        bottom: '40pt',
        right: '30pt',

    },

    logoTextAha2: {
        justifyContent: "flex-end",
        flexGrow: 0,
        flexShrink: 1,
        fontWeight: 900,
        display: "flex",
        color: clientColors.primary[700],
        bottom: '40pt',
        right: '245pt',
    }

});

export const tabs = {
    variant: "line",
    color: '#e13000',
};

export const inputField = {

    baseStyle: {


        bg: 'white',
        borderRadius: clientBorders.radius,
        boxShadow: `0 6px 15px 0 rgba(0, 0, 0, 0.08)`,


    },
}

export const clientProps = {

    colorField: colorField,

    buttons: clientButtons,
    borders: clientBorders,

    client: client,

    styles: clientStyles,

    links: {

        url: "https://www.aha-region.de/",
        mail: "mail"
    },

    font: clientFonts,

    colors: clientColors,


    tabs: tabs,

    focus: focus,

    inputField: inputField,
};

