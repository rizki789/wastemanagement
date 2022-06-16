import { Text, Box } from "@chakra-ui/react"
import useDemandStore from '@hooks/useDemandStore'
import { themeColors } from "@components/utils/GlobalTheme"
import textDB from "@assets/data/textDB"
import { useTheme } from "@chakra-ui/react"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"
import { tabs } from "@styles/ClientStyle"

const DemandInput = () => {

    const maxApartments = 300
    const demand = useDemandStore(state => state.apartmentCount);
    const setDemand = useDemandStore(state => state.setApartmentCount);

    const {focus, buttons} = useTheme()

    const set = (newValue: number) => {
        if (newValue > maxApartments) {
            newValue = maxApartments;
        }
        if (newValue < 1) {
            newValue = 1;
        }
        setDemand(newValue)
    }

    const placeholderText = textDB.containerBar.input;
    const units = textDB.containerBar.units;

    return (

        <>
            <Text fontSize="lg" variant={"h4"} layerStyle={["frameTop", "frameBottom"]}>Bedarfsermittlung</Text>

            <NumberInput
                id="deamndInput_NumberInput "
                layerStyle={["colorField", "borderRadius", "shadowField"]}
                inputMode={"numeric"}

                defaultValue={undefined}
                precision={0}
                step={1}
                min={1}
                max={maxApartments}
                value={demand}
                onChange={((valueAsString: string, valueAsNumber: number) => set(valueAsNumber && !isNaN(valueAsNumber) ? valueAsNumber : 1))}>
                <Box position={'relative'}>
                    <NumberInputField id={"demand_input_field"} autoFocus placeholder={placeholderText} _focus={focus} border="hidden"/>
                    {demand !== undefined ? <label id={"demand_label"} style={{fontFamily:"Arial"}}>{units}</label> : null}
                </Box>
                <NumberInputStepper>
                    <NumberIncrementStepper id="deamndInput_NumberIncrementStepper" />
                    <NumberDecrementStepper id="deamndInput_NumberDecrementStepper" />
                </NumberInputStepper>
            </NumberInput>
        </>

    );
}

export default DemandInput;