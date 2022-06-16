import { Layout, WasteType, DisposalType, QuestionCategory, ContainerAmountPerWaste } from "@types"

import behaelter_4rad_multi from '@assets/img/behaelter_4rad_multi.png';
import behaelter_2rad_multi from '@assets/img/behaelter_2rad_multi.png';
import text from "@assets/data/textDB"
import MDXPDFComponents from "@components/utils/MDXPDFComponents"
import company_logo from "@assets/img/aha-logo_128x128.png"
import ReactMarkdown from "react-markdown"
import { QueryUrl, QuestionStore } from "@hooks/useQuestionStore"
import { Svg, Path, G } from '@react-pdf/renderer';
import { getWasteImages } from "@hooks/getWasteImages"
import { ClientTemplate } from "@styles/PDFTemplate"
import {containers} from "@assets/data/containerDB";

import { themeColors, pdfStyle as s, pdfTextStyles as t } from "@components/utils/GlobalTheme"
import { clientProps, clientStyles } from "@styles/ClientStyle"

// import { logo } from "@components/pdf/logo.js";

import ReactPDF, {
    Page,
    Image,
    Text,
    View,
    Link,
    Document,
    StyleSheet,
    Font
} from '@react-pdf/renderer';

// import { themeColors, pdfTextStyles as t } from "@styles/GlobalTheme"
import getFormattedFigure from "@hooks/getFormattedFigure"


export const replaceLinks = (text: string, url: string) => {

    let newText: string = text;
    if (text.includes("%URL%")) { newText = text.replaceAll("%URL%", url) }
    if (text.includes("%25URL%25")) { newText = text.replaceAll("%25URL%25", url) }
    if (text.includes("%MAILADDRESS%")) { newText = text.replaceAll("%MAILADDRESS%", clientProps.links.mail) }
    if (text.includes("%25MAILADDRESS%25")) { newText = text.replaceAll("%25MAILADDRESS%25", clientProps.links.mail) }

    return newText

}

// Create Document Component
const PDFPage = ({ demand, data, layout, activeQuestions, list, url, svg }: { demand: number, data: ContainerAmountPerWaste, layout?: Layout, activeQuestions: QuestionCategory[], list: QuestionStore, url: string, svg: React.ReactNode }) => {

    // const t = pdfTextStyles;
    // const s = pdfStyle;

    // Font.register({
    //     family: `${clientProps.font.fontPrimary}`,
    //     fonts: [
    //         { src: clientProps.font.fontPrimary },
    //         { src: clientProps.font.fontBold, fontWeight: 600 },
    //         { src: clientProps.font.fontSecondary, fontWeight: 400 }
    //     ],
    // });

    // Font.register({
    //     family: `${clientProps.font.fontSecondary}`,
    //     fonts: [
    //         { src: clientProps.font.fontSecondary },
    //     ],
    // });

    Font.registerHyphenationCallback(word => [word]);

    const getTextStyle = (type: string) => {

        if (type === "h2") { return t.h2 }
        else if (type === "h4") { return t.h4 }
        else { return t.p; }
    }

    const images = getWasteImages(clientProps.client);

   


    return (
        <Document>

            <Page wrap style={s.pagePadding}>

                {/* ------------ Site 1--------------- */}

                <View style={[clientStyles.ahaPadding]}>


                    <View style={[s.posAbsolute]}>

                        <ClientTemplate />
                    </View>



                    <View style={[s.posRelative]}>


                        {text.markdown.pdf.first.map((t, i, elements) => {

                            return (
                                <>
                                    {t && <ReactMarkdown key={i} components={MDXPDFComponents}>
                                        {replaceLinks(t, url)}
                                    </ReactMarkdown>}
                                </>
                            )

                        })}



                    </View>




                </View>

                {/*------------ Site 2--------------- */}

                <View wrap={false} break>

                    <Text style={[t.h2]}> {text.containerBar.title}  </Text>
                    <Text style={[t.h4]}>  Für {demand} Wohneinheiten  </Text>

                    <View style={[s.flexRow, s.flexNoWrap, s.padding, s.borderBottom]}>

                        <View style={[s.flexSize20, s.flexWrap, s.flexColumn, s.flexJustifyBottom]}>

                            <Text style={[t.h4]}>{text.containerBar.wasteTable[0]}</Text>
                        </View>

                        <View style={[s.flexSize20, s.flexWrap, s.flexColumn,]}>
                            <Image src={behaelter_2rad_multi} style={[s.image]} />
                            <Text style={[t.h4, t.capitalize]}>{text.containerBar.wasteTable[1]}</Text>
                        </View>

                        <View style={[s.flexSize20, s.flexWrap, s.flexColumn,]}>
                            <Image src={behaelter_4rad_multi} style={[s.image]} />
                            <Text style={[t.h4, t.capitalize]}>{text.containerBar.wasteTable[2]}</Text>
                        </View>

                        <View style={[s.flexSizeAutoMax, s.flexWrap, s.flexColumn, s.flexJustifyBottom]}>
                            <Text style={[t.h4, t.capitalize]}>{text.containerBar.wasteTable[3]}</Text>
                        </View>

                    </View>


                    {data && Object.keys(data).map((key, i) => {
                        return (
                                <View key={i} style={[s.flexRow, s.flexNoWrap, s.padding, s.borderBottom]} >

                                    {/* IMAGE */}
                                    <View style={[s.flexSize20, s.flexWrap,]}>
                                        <Image src={images ? images[key as WasteType] : ""} style={[s.image]} />
                                        {/* <Image width={boxSize} src={images[key as WasteType]} alt={`${[key as WasteType]}`} objectFit={imageFit} /> */}
                                        <Text style={[t.p, t.capitalize]}> {`${data ? data[key as WasteType]?.title : ""}`} </Text>
                                    </View>

                                    {/* 2 RAD */}
                                    <View style={[s.flexSize20, s.flexWrap,]}>
                                        <Text style={[t.h4]}>
                                            {data[key as WasteType]?.categories.zwei_rad?.preciseAmount?.map((x,i) => { if (x.amount > 0) { 
                                                // return (<Text key={i}> {x.amount} x {x.containerSize} l</Text>) } else { return 0 } 
                                                return (<Text key={i}> {x.amount} x {containers[x.container]!.capacity} l</Text>) } else { return 0 } 
                                                })}
                                        </Text>
                                    </View>

                                    {/* 4 RAD */}
                                    <View style={[s.flexSize20, s.flexWrap,]}>
                                        <Text style={[t.h4]}>
                                            {data[key as WasteType]?.categories.vier_rad?.preciseAmount?.map((x,i) => { if (x.amount > 0) { 
                                                // return (<Text key={i}> {x.amount} x {x.containerSize} l</Text>) } else { return 0 } 
                                                return (<Text key={i}> {x.amount} x {containers[x.container]!.capacity} l</Text>) } else { return 0 } 
                                                })}
                                        </Text>
                                    </View>

                                    {/* Entleerung */}
                                    <View style={[s.flexSizeAutoMax, s.flexWrap,]}>
                                        <View style={[s.flexColumn, s.padding]}>
                                            <Text style={[t.h4]}>

                                                {getFormattedFigure(data[key as WasteType]?.wasteByApartment, undefined, undefined, 3)}
                                            </Text>
                                            <Text style={[t.p]}>
                                                {text.containerBar.disposals[data[key as WasteType]?.disposals as DisposalType]}
                                            </Text>
                                        </View>
                                    </View>


                                </View>
                        )
                    }) }

                </View>

                {/*------------  Site 3 --------------- */}

                <View wrap={false} break>


                    <Text style={[getTextStyle(text.markdown.pdf.third[0]?.type)]}> {text.markdown.pdf.third[0]?.text}  </Text>

                    <View style={[s.flexRow, s.flexNoWrap, s.borderBottom]}>
                        <Text style={[{ backgroundColor: themeColors.highlight.signal }, getTextStyle(text.markdown.pdf.third[1]?.type)]}> {`    `} </Text>
                        <Text style={[getTextStyle(text.markdown.pdf.third[1]?.type)]}> {` `}{text.markdown.pdf.third[1]?.text}</Text>
                    </View>

                    {activeQuestions.map((oneCat, CIndex) => {

                        return (

                            <View id={"one_category"} key={oneCat.category+"_"+CIndex}>

                                {oneCat &&
                                    <View style={[s.flexRow, s.flexNoWrap, s.borderBottom, s.padding, { backgroundColor: themeColors.background.active }]}>
                                        <Text style={[t.h4]}>
                                            {oneCat.category}
                                        </Text>
                                    </View>}

                                {oneCat?.questions?.map((oneQue, Qindex) => {

                                    let bg = list[oneQue.uid]?.approval === false && oneQue?.service === true
                                    return (

                                        <View style={[s.flexRow, s.flexNoWrap, s.borderBottom, s.flexJustifySpace, s.padding, { backgroundColor: bg ? themeColors.highlight.signal : "transparent" }]}>
                                            <Text style={[t.p]}>
                                                {oneQue.text}
                                            </Text>
                                            <Text style={[t.p]}>
                                                {list[oneQue.uid].approval == true ? "Ja" : "Nein"}
                                            </Text>
                                        </View>

                                    )

                                })}

                            </View>)
                    })}
                </View>

                {/*------------  Site 4 --------------- */}

                <View wrap={true} break>
                    <View>
                         {svg}
                    </View>
                </View>

                {/*------------ Footer --------------- */}
                <View style={[s.flexRow, s.footer]} fixed>
                    <Text style={[s.flexSize50, t.p, t.alignLeft]} render={({ pageNumber, totalPages }) => (pageNumber > 1 ? `` : null)} />
                    <Text style={[s.flexSize50, t.p, t.alignRight]} render={({ pageNumber, totalPages }) => (pageNumber > 1 ? `${pageNumber} | ${totalPages}` : null)} />
                </View>

            </Page>
        </Document >

    );

};


export default PDFPage;