import axios from 'axios';
import textDB from "@assets/data/textDB";
import useDemandStore from '@hooks/useDemandStore';
import text from "@assets/data/textDB";
import useContainerData from '@hooks/useContainerData';
import useQuestionStore from '@hooks/useQuestionStore';
import { ContainerAmountPerWaste } from "@types";
import { WasteType, DisposalType } from "@types";
import {containers} from "@assets/data/containerDB";
import getFormattedFigure from "@hooks/getFormattedFigure";
import { QuestionStore } from "@hooks/useQuestionStore";
import { QuestionCategory } from "@types";
import { themeColors, pdfTextStyles as t } from "@components/utils/GlobalTheme";
import ReactMarkdown from "react-markdown";
import MDXHTMLComponents from "@components/utils/MDXHTMLComponents";
import ReactDOMServer from 'react-dom/server';
import { replaceLinks } from "@components/pdf/PDFPage";

import behaelter_4rad_multi from '@assets/img/behaelter_4rad_multi.png';
import behaelter_2rad_multi from '@assets/img/behaelter_2rad_multi.png';
//import { useTheme } from "@chakra-ui/react"
import { getWasteImages } from "@hooks/getWasteImages";
import { client } from "@styles/ClientStyle"

const mailData = {
    mailSuccess: null,
    serviceCode: Math.floor(Math.random() * 10000000000).toString(16), //needs testing, if unique enough
}


// getHtml: function(pdf){
//         var maddress = "01_Vertrieb"+"@"+"BSR"+"."+"de";
//         var mail = "<html><head><meta http-equiv='content-type' content='text/html; charset=UTF-8'></head><body>";
//         //mail intro text: replace placeholder of text in modules.textDB with replacements
//         var replacements = {"%SERVICECODE%": serviceCode,"%URL%": url, "%MAILADDRESS%": maddress} 

//         var template = text.html.mail;

//         if(pdf === true){
//             template = text.html.pdf;
//         }

//         mail += template.replace(/%\w+%/g, function(all) {
//             return replacements[all] || all;
//         });
//         mail += $refs.wasteComponent.getHTML();
//         mail += $refs.questionComponent.getHTML();
//         mail += "</body></html>";
//         return mail;
//     },

const getHTMLTable = (demand: number, data: ContainerAmountPerWaste) => {


    // const { themeColors, pdfTextStyles } = useTheme()
    //const t = pdfTextStyles
    const images = getWasteImages(client);
    console.log("images",images)
    var mail = "</br>";

    mail += '<h4 style="font-size:1.5rem;" class="bsr-mail-page-break-before"><b>Bedarfsermittlung</b></h4></br>';
    mail += `<p><h4 style="font-size:1.25rem;">Für <font color="${themeColors.highlight.darker}"> ${demand} </font>`;

    if (demand <= 1) {
        mail += ' Wohneinheit:';
    } else {
        mail += ' Wohneinheiten:';
    }
    mail += '</h4></p>';

    mail += '<table class="bsr-table-mail" width="100%" cellspacing="0" cellpadding="0" border="0">';



    mail += '<tr><th valign="bottom" align="left">' + text.containerBar.wasteTable[0] + '</th>';

    mail += '<th valign="bottom" align="left">';
    mail += '<img width="44" src="' + behaelter_2rad_multi + '" />';
    mail += '</br>' + text.containerBar.wasteTable[1] + '</th>';

    mail += '<th valign="bottom" align="left">';
    mail += '<img width="44" src="' + behaelter_4rad_multi + '"/>';
    mail += '</br>' + text.containerBar.wasteTable[2] + '</th>';

    mail += '<th valign="bottom" align="left">' + text.containerBar.wasteTable[3] + '</th></tr>';


    Object.keys(data).map((key, i) => {

        mail += '<tr>'

        {/* IMAGE */ }
        var tdTag = '<td>';
        if (key == "glas_bunt" || key == "glas_weiss") {
            tdTag = '<td style="color:#aaaaaa;">'
        }

        mail += '<td>' + '<img width="44"  src="' + images ? [key as WasteType] : "" + '"/></br>';
        mail += data ? data[key as WasteType]?.title : "" + '</td>';

        {/* 2 RAD */ }
        mail += '<td>';
        mail += data[key as WasteType]?.categories.zwei_rad?.preciseAmount?.map(x => { if (x.amount > 0) { return (`${x.amount} x ${containers[x.container]!.capacity} l `) } else { return 0 } });
        mail += '</td>';

        {/* 4 RAD */ }
        mail += '<td>';
        mail += data[key as WasteType]?.categories.vier_rad?.preciseAmount?.map(x => { if (x.amount > 0) { return (`${x.amount} x ${containers[x.container]!.capacity} l `) } else { return 0 } });
        mail += '</td>';

        {/* Entleerung */ }
        mail += '<td>';
        mail += `<p>${getFormattedFigure(data[key as WasteType]?.wasteByApartment, undefined, undefined, 3)}</p>`;
        mail += `<p>${text.containerBar.disposals[data[key as WasteType]?.disposals as DisposalType]}</p>`;
        mail += '</td>';

        mail += '</tr>';

    })

    mail += '</table>';

    return mail;
}

const getHTMLQuestions = (list: QuestionStore, getActiveQuestions: () => QuestionCategory[]) => {


    var mail = "</br>";

    mail += `<h4 style="font-size:1.5rem;" class="bsr-mail-page-break-before"><b>${text.markdown.pdf.third[0]?.text}</b></h4></br>`;
    mail += `<span style="display:inline">`
    mail += `<p style="background-color:${themeColors.highlight.signal}"> ${text.markdown.pdf.third[1]?.text} </p>`;
    // mail += `<h6 style="font-size:1.25rem;"> ${text.html.pdf.third[1]?.text}</h6>`;
    mail += `</span>`


    {
        getActiveQuestions().map((oneCat, CIndex) => {


            mail += '<table class="bsr-table-mail" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>';



            mail += `<tr style="background-color:${themeColors.background.active}">`;
            mail += '<td>';
            mail += `<h6 style="line-height:2.5rem;"><b>${oneCat?.category}</b></h6>`
            mail += '</td>';
            mail += '<td>';
            mail += '</td>';
            mail += '</tr>';


            {
                oneCat?.questions?.map((oneQue, Qindex) => {

                    let bg = list[oneQue.uid]?.approval === false && oneQue?.service === true

                    mail += `<tr style="background-color:${bg ? themeColors.highlight.signal : "transparent"};">`;

                    mail += '<td>';
                    mail += ReactDOMServer.renderToStaticMarkup(<ReactMarkdown components={MDXHTMLComponents}>{oneQue.text}</ReactMarkdown>)
                    mail += '</td>';

                    mail += '<td style="text-align: right;">';
                    mail += list[oneQue.uid].approval == true ? "Ja" : "Nein";
                    mail += '</td>';

                    mail += '</tr>';

                })
            }



            return mail
        })
    }

    mail += '</tbody></table>';

    return mail;
}


const SendMail = () => {

    const demand = useDemandStore(state => state.apartmentCount);
    const data = useContainerData(state => state.store)
    const getActiveQuestions = useQuestionStore(state => state.getActiveQuestions);
    const list = useQuestionStore(state => state.store);
    const getUrl = useQuestionStore(state => state.getUrl);

    const getText = () => {


        let htmlText = "";
        htmlText += '<article className="content">'

        text.markdown.pdf.first.map((t, i, elements) => {

            htmlText += ReactDOMServer.renderToStaticMarkup(<ReactMarkdown components={MDXHTMLComponents}>{replaceLinks(t, getUrl())}</ReactMarkdown>)
        })
        htmlText += "</article>"

        return htmlText;
    }


    const mail = data !== undefined && demand !== undefined ? getText() + getHTMLTable(demand, data) + getHTMLQuestions(list, getActiveQuestions) : "";

    var html = `<html><head><meta http-equiv='content-type' content='text/html; charset=UTF-8'></head><body> ${mail} </body></html>`;

    // axios.post('https://formfollowsyou.com/standplatzplaner/sendmail.php', { //'./'+_path+'assets/sendmail.php'
    //     mail: "",        //data[0],
    //     name: "name",    //data[1],
    //     serviceCode: mailData.serviceCode,
    //     text: html        //getHtml(false)
    // })
    //     .then(function (response) {
    //         mailData.mailSuccess = response.data;
    //     })
    //     .catch(function (error) {
    //         mailData.mailSuccess = error.data;
    //     });
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export default SendMail;