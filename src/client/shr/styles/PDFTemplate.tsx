import {
    Svg,
    Path,
    Image,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';
import { themeColors, pdfTextStyles as t } from "@components/utils/GlobalTheme"
import { clientProps } from "@styles/ClientStyle"
import company_logo from "@assets/img/aha-logo_128x128.png"
import { pdfStyle } from "@components/utils/GlobalTheme"

 
 export const ClientTemplate = () => {


    return (
        <>
            <Svg width="595" height="841" viewBox="20 20 595 841">
                <Path d="M37,0 L37,776 C37,776 37,787 48,788 L487,787" fill={"none"} stroke={'rgb(24,57,138)'} strokeWidth={1} />
            </Svg>

            <View style={[pdfStyle.flexRow, pdfStyle.footer]}>

                <View style={[pdfStyle.flexSizeAuto]}></View>

                <Text style={[clientProps.styles.logoTextAha2, t.h4]}> www.aha-region.de</Text>

                <Text style={[clientProps.styles.logoTextAha, t.h4]}> einfach. alles. sauber.</Text>

                <View style={[clientProps.styles.logoAha]}>
                    <Image src={company_logo} />
                </View>

            </View>
        </>)


}
export default ClientTemplate;