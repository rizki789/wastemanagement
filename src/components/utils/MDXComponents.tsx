import {forwardRef} from "react"
import {
    Alert,
    AspectRatio,
    Box,
    chakra,
    HTMLChakraProps,
    Kbd,
    useColorModeValue,
  } from "@chakra-ui/react"
  import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
  
  
  
  const Pre = (props: any) => <chakra.div my="2em" borderRadius="sm" {...props} />
  
  const Table = (props: any) => (
    <chakra.div overflowX="auto">
      <chakra.table textAlign="left" mt="32px" width="full" {...props} />
    </chakra.div>
  )
  
  const THead = (props: any) => (
    <chakra.th
      bg={useColorModeValue("gray.50", "whiteAlpha.100")}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  )
  
  const TData = (props: any) => (
    <chakra.td
      p={2}
      borderTopWidth="1px"
      borderColor="inherit"
      fontSize="sm"
      whiteSpace="normal"
      {...props}
    />
  )
  
  const MDXComponents = {
    h1: (props: any) => <chakra.h1 apply="mdx.h1" {...props} />,
    h2: (props: any) => <chakra.h2 apply="mdx.h2" {...props} />,
    h3: (props: any) => <chakra.h3 apply="mdx.h3" {...props} />,
    h4: (props: any) => <chakra.h4 apply="mdx.h4" {...props} />,
    hr: (props: any) => <chakra.hr apply="mdx.hr" {...props} />,
    strong: (props: any) => <Box as="strong" fontWeight="semibold" {...props} />,
    pre: Pre,
    kbd: Kbd,
    br: ({ reset, ...props }: any) => (
      <Box
        as={reset ? "br" : undefined}
        height={reset ? undefined : "24px"}
        {...props}
      />
    ),
    table: Table,
    th: THead,
    td: TData,
    a: forwardRef((props: any, ref: any) => (
      <chakra.a ref={ref} apply="mdx.a" {...props} />
    )),
    p: (props: any) => <chakra.p apply="mdx.p" {...props} />,
    ul: (props: any) => <UnorderedList apply="mdx.ul" {...props} />,
    ol: (props: any) => <OrderedList apply="mdx.ul" {...props} />,
    li: (props: any) => <ListItem {...props} />,
    blockquote: (props: any) => (
      <Alert
        mt="4"
        role="none"
        status="warning"
        variant="left-accent"
        as="blockquote"
        rounded="4px"
        my="1.5rem"
        {...props}
      />
    ),
  }
  
  export default MDXComponents