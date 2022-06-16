import { forwardRef } from "react"

import { pdfStyle } from "@components/utils/GlobalTheme"
import { emailTextStyles as e } from "@components/utils/GlobalTheme"

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

const MDXHTMLComponents = {

 
    // h2: (children : any) => (<h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>),
    // p: (children : any) => (<p>{children}</p>),
    
    h1: (props: any) => <h1  style={e.h2}  {...props} />,
    h2: (props: any) => <h2 style={e.h2} {...props} />,
    h3: (props: any) => <h3 style={e.h2} {...props} />,
    h4: (props: any) => <h4 style={e.h4} {...props} />,
    h6: (props: any) => <h6 style={e.h4} {...props} />,
    // hr: (props: any) => <Text apply="mdx.hr" {...props} />,
    strong: (props: any) => <strong {...props} />,
    pre: (props: any) => <pre {...props} />,
    // kbd: Kbd,
    //  br: ({ reset, ...props }: any) => <br {...props} />,
    // table: Table,
    // th: THead,
    // td: TData,
     a: forwardRef((props: any, ref: any) => (
         <a href={ref}  style={e.a} {...props} />
     )),
    p: (props: any) => <p style={e.p} {...props} />,
    ul: (props: any) => <ul {...props} />,
    ol: (props: any) => <ol {...props} />,
    li: (props: any) => <li {...props} />,
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

export default MDXHTMLComponents