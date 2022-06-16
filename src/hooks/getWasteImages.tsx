import leichtverpackungen from '@assets/img/wertstoffe_Icons_placeholder.png';
import papier from '@assets/img/ppk_Icons_placeholder.png';
import restabfaelle from '@assets/img/hm_Icons_placeholder.png';
import bioabfaelle from '@assets/img/bio_Icons_placeholder_02.png';
import glas from '@assets/img/Glas_128x128.png';
import {clientType} from "@components/utils/GlobalTheme"
import wertstoffe from '@assets/img/wertstoff.png';
import ppk from '@assets/img/ppk.png';
import hm from '@assets/img/hm.png';
import bio from '@assets/img/bio.png';
import glas_bunt from '@assets/img/glas_bunt.png';
import glas_weiss from '@assets/img/glas_weiss.png';
import behaelter_4rad_multi from '@assets/img/behaelter_4rad_multi.png';
import behaelter_2rad_multi from '@assets/img/behaelter_2rad_multi.png';


import { WasteType } from "@types"


type imagesType = { [key in WasteType]: string }

export const getWasteImages = (client: clientType) => {

if (client === "aha") return {
    wertstoffe: leichtverpackungen,
    ppk: papier,
    hm: restabfaelle,
    bio: bioabfaelle,
    glas_bunt: glas_bunt,
    glas_weiss: glas
}
else if (client === "bsr" || client == undefined) return {
    wertstoffe: wertstoffe,
    ppk: ppk,
    hm: hm,
    bio: bio,
    glas_bunt: glas_bunt,
    glas_weiss: glas_weiss
}
else  return {
    wertstoffe: leichtverpackungen,
    ppk: papier,
    hm: restabfaelle,
    bio: bioabfaelle,
    glas_bunt: glas_bunt,
    glas_weiss: glas
}
}
