import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  VStack,
  HStack

} from "@chakra-ui/react"
import { PDF } from "@components/pdf/PDF"
import text from "@assets/data/textDB"
import { pdfStyle } from "@components/utils/GlobalTheme"
import SendMail from "@components/utils/SendMail"
import { IoMailOutline } from "react-icons/io5";




type Disclosure = {

  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const PdfModal = ({ isOpen, onOpen, onClose }: Disclosure) => {

  const [html, setHtml] = useState(false)
  const [mail, setMail] = useState("")
  const [isValid, setValid] = useState(false)

  const [createPDF, setCreatePDF] = useState(false);
  // const PDF = React.lazy(() => import('@helpers/PDF'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (validateEmail(event.target.value)) {
      setMail(event.target.value);
      setValid(true)
    }
    else setValid(false)

  }



  return (
    
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>

      <ModalOverlay />

      <ModalContent>

        <ModalHeader>
          <Text fontSize={"md"}>{text.confirmDialog.title}</Text>
          <Text fontSize={"xl"}>{text.confirmDialog.subtitle}</Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={5} alignItems={"flex-start"}>
            <Text fontSize={"sm"}>
              {text.confirmDialog.explanation}
            </Text>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<IoMailOutline />}
              />
              <Input isInvalid={!isValid} errorBorderColor="red.300" type="tel" placeholder="Email" onChange={handleChange} />
            </InputGroup>

            <HStack w={'full'}>
              
            

               {isOpen ? <PDF>   
              </PDF> : null} 

              <Button isDisabled={!isValid} variant="solid" onClick={() => { setHtml(true) }} w={'full'}> Send  </Button>


            </HStack>


          </VStack>
         
          {html && <SendMail></SendMail>}


        </ModalBody>





      </ModalContent>
    </Modal>
  )
}

export default PdfModal;