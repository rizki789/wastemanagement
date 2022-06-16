import { forwardRef } from "react"
import { Page, View, Link, Text, Document, StyleSheet, usePDF, BlobProvider } from '@react-pdf/renderer';
import { pdfTextStyles as t } from "@components/utils/GlobalTheme"
import { pdfStyle } from "@components/utils/GlobalTheme"


//   const Pre = (props: any) => <chakra.div my="2em" borderRadius="sm" {...props} />

//   const Table = (props: any) => (
//     <chakra.div overflowX="auto">
//       <chakra.table textAlign="left" mt="32px" width="full" {...props} />
//     </chakra.div>
//   )

//   const THead = (props: any) => (
//     <chakra.th
//       bg={useColorModeValue("gray.50", "whiteAlpha.100")}
//       fontWeight="semibold"
//       p={2}
//       fontSize="sm"
//       {...props}
//     />
//   )

//   const TData = (props: any) => (
//     <chakra.td
//       p={2}
//       borderTopWidth="1px"
//       borderColor="inherit"
//       fontSize="sm"
//       whiteSpace="normal"
//       {...props}
//     />
//   )

const MDXPDFComponents = {
    h1: (props: any) => <Text style={[t.h2]} {...props} />,
    h2: (props: any) => <Text style={[t.h2]} {...props} />,
    h3: (props: any) => <Text style={[t.h4]} {...props} />,
    h4: (props: any) => <Text style={[t.h4]} {...props} />,
    // hr: (props: any) => <Text apply="mdx.hr" {...props} />,
    strong: (props: any) => <Text style={[{ fontWeight: "semibold" }]} {...props} />,
    pre: (props: any) => <Text {...props} />,
    // kbd: Kbd,
    br: ({ reset, ...props }: any) => { console.log("br"); return <Text {...props} /> },
    // table: Table,
    // th: THead,
    // td: TData,
    a: forwardRef((props: any, ref: any) => (
        <Link ref={ref} style={[pdfStyle.link]} {...props} />
    )),
    p: (props: any) => <Text style={[t.p]} {...props} />,
    // ul: (props: any) => <UnorderedList apply="mdx.ul" {...props} />,
    // ol: (props: any) => <OrderedList apply="mdx.ul" {...props} />,
    // li: (props: any) => <ListItem {...props} />,
    // blockquote: (props: any) => (
    //   <Alert
    //     mt="4"
    //     role="none"
    //     status="warning"
    //     variant="left-accent"
    //     as="blockquote"
    //     rounded="4px"
    //     my="1.5rem"
    //     {...props}
    //   />
    // ),
}

export default MDXPDFComponents