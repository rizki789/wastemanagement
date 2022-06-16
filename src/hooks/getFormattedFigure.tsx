const getFormattedFigure = (value?: number | [number, number] | string, prefix?: string, suffix?: string, decimals?: number) => {


    /* TODO-LANG - needed? */
    const recogniseSuffix = (input?: string) => {

        /* const m: JSX.Element = <> m</>
         const m2: JSX.Element = <> m<sup>2</sup></>
         const m3: JSX.Element = <> m<sup>3</sup></>*/
        const m: string = " m"
        const m2: string = " m²"
        const m3: string = " m³"

        let output = input === "m" ? m : input === "m2" ? m2 : input === "m3" ? m3 : input ? " " + input : input;

        return output ? output : "";
    }

    const recognisePrefix = (input?: string) => {

        return input ? input + " " : "";
    }

    const getDecimals = (v: number, decimals?: number) => {
        
        if (v !== undefined && decimals !== undefined && decimals >= 0) {

            let precision = Math.pow(10, decimals)
            let result = Math.round(v * precision) / precision

            console.log("RESULT", v, precision, result, new Intl.NumberFormat('de-DE').format(result))

            return fixDecimalPlaces(new Intl.NumberFormat('de-DE').format(result))
        }
        else { return new Intl.NumberFormat('de-DE').format(v) }
    }


    const fixDecimalPlaces = (n:string) => {
        let i = n.indexOf(",") //digits before comma
        let decimalsDigits = i > 0 ? n.length - i - 1 : 0 //number of decimal digits
        if (decimalsDigits === 1) {return n + "0"} //add 0 to string if there is only 1 digit
        else return n
    }

    const formatValue = (value: number | [number, number] | string) => {

        if (typeof value === "number") {

            return getDecimals(value, decimals);

        } else if (typeof value === "string") {

            return value
        }

        else {
            return getDecimals(value[0], decimals) + " - " + getDecimals(value[1], decimals)
        }
    }


    return (recognisePrefix(prefix)) +
        (value !== undefined ? formatValue(value) : " - ") +
        (recogniseSuffix(suffix))



}

export default getFormattedFigure;