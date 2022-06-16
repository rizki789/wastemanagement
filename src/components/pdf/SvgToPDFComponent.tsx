import { useMemo, createElement, ReactNode } from "react";
import { parse, TextNode, ElementNode, RootNode } from "svg-parser"


const supportedStyleProps = [
  "color",
  "dominantBaseline",
  "fill",
  "fillOpacity",
  "fillRule",
  "opacity",
  "stroke",
  "strokeWidth",
  "strokeOpacity",
  "strokeLinecap",
  "strokeDasharray",
  "transform",
  "textAnchor",
  "visibility"
]

function isElementNode(node: TextNode | ElementNode): boolean {
  return node.type === 'element'
}

function removeLineBreaks(text?: string | number | boolean) {
  if (typeof text === 'string') {

    return text.replace(/(\r\n|\n|\r)/gm, "")
  }
  
  return text;
}

/**
 * format string to camel case
 * https://dev.to/qausim/convert-html-inline-styles-to-a-style-object-for-react-components-2cbi
 * @param str string i.e. transform-origin
 * @returns string i.e. transformOrigin
 */
const formatStringToCamelCase = (str: string) => {
  const splitted = str.split("-");
  if (splitted.length === 1) return splitted[0];
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );
};

/**
 * Converts svg style string to react css object
 * @param str style string
 * @returns css object
 */
const getStyleObjectFromString = (str: string | null) => {
  const style: any = {};
  if (!str) return {};

  str.split(";").forEach((el) => {
    let [property, value] = el.split(":");
    if (!property) return;
    if (property === "cursor") return;
    const formattedProperty = formatStringToCamelCase(property.trim());
    if (supportedStyleProps.includes(formattedProperty)) {
      if(formattedProperty === "strokeDasharray"){
        value = value.replace(/pt/g, "") //dasharray has now px
      }
      style[formattedProperty] = value.trim();
    }
  });
  return style;
};

/**
 * takes care of absolute and relative positioning of node in consideration of parent position
 * @param node current node
 * @param parentX parent position x
 * @param parentY parent position y
 * @returns object with correct absolute positions {x: .., y: ..}
 */
function handleRelativePositioning(node: ElementNode, parentX?: number, parentY?: number) {
  
  return {
          x: (Number(node.properties?.x ?? parentX ?? 0)) + Number(node.properties?.dx ?? 0),
          y: (Number(node.properties?.y ?? parentY ?? 0)) + Number(node.properties?.dy ?? 0)
    };
}

/**
 * Convert SVG Transform to CSS Transform - currently only rotation
 * @param str transform object string i.e. rotate(90 10 10)
 * @returns css svg object
 */
const convertSVGToCSSTransform = (str: string) => {
      let svgRotate = str.split(/rotate\((.*?)\)/);
      if(svgRotate.length > 1){
      let rotateParameters = svgRotate[1].split(/[\s\,]/) //split at whitespace or ,
      return (rotateParameters.length === 3) ? {
            transform: "rotate("+rotateParameters[0]+"deg)", 
            transformOrigin: rotateParameters[1]+"pt "+rotateParameters[2]+"pt"
          }:
          {
            transform: "rotate("+rotateParameters[0]+"deg)", 
          }
      }
}

function getParentPosition(pos: number | string | undefined) {
  if (!pos) return 0;
  if (typeof pos === 'string') return Number(pos);
  return pos;
}

/**
 * recursively goes through svg nodes parsed by svg-parser and creates react-pdf nodes
 * @param svgNode node taken from svg-parser parsed svg
 * @param key node key for identification for react
 * @param parentX within recursion, passes parent x position for relative positioning
 * @param parentY within recursion, passes parent y position for relative positioning
 * @returns react-pdf nodes
 */
function svgToJSXWithRelPositioning(
  svgNode: TextNode | ElementNode | string, key?: string, parentX?: number, parentY?: number
): any {
  if (typeof svgNode === 'string') {
    return svgNode !== '' && removeLineBreaks(svgNode);
  }
  if (!isElementNode(svgNode)) {
    return svgNode.value !== '' && removeLineBreaks(svgNode.value);
  }
  else{
    let node: ElementNode = svgNode as ElementNode;
  
  
    const elementName = node.tagName;
    if (!elementName) {
      
      return null;
    }

    const parsedProps = node.properties && Object.keys(node.properties).reduce((acc, x: string): Record<string, any> =>{
      return { 
        ...acc, 
        [formatStringToCamelCase(x)]: node.properties![x] 
      }
    }, {})

    let componentProps: Record<string, any> = {};
    if (node.tagName === 'desc' || node.tagName === 'defs') return null;

    if (node.properties !== undefined && parsedProps !== undefined) {
        if (node.tagName === "text" || node.tagName === "tspan" || node.tagName === "rect") {
          componentProps = handleRelativePositioning(node, parentX, parentY);
              componentProps = {
                ...parsedProps,
                ...componentProps,
              }            
        }else{
          componentProps = parsedProps;
        }
      
        
        let transformStyle = typeof node.properties.transform === "string" ? convertSVGToCSSTransform(node.properties.transform) : {}
        

        let style = node.properties.style ? getStyleObjectFromString(node.properties.style as string) : {}

        componentProps = {
            ...componentProps,
            //https://github.com/diegomura/react-pdf/issues/1251#issuecomment-834616237
            //style: {...getStyleObjectFromString(parsedProps.style as string), transform: componentProps.transform ?? ""}
            style: {...style, ...transformStyle}
          }
          //console.log("mynode", componentProps, transformStyle);

      
    }
    let children = [];
    if (node.children && node.children.length > 0) {
      children = node.children.map(
        (childNode: TextNode | ElementNode | string, i: number) => 
          svgToJSXWithRelPositioning(
            childNode, key+"-"+i, getParentPosition(node.properties?.x), getParentPosition(node.properties?.y)
          ) 
      )
    }else{
      children = [""]
    }
    componentProps = {...componentProps, key: key ?? "root"};
    return createElement(elementName.toUpperCase(), componentProps, children);
  }
}

function changeSvgSize (svg: string, width: number, height:number) {
  // let width= text.slice(text.indexOf('width: 100%')-4,text.indexOf('width: 100%')); 
  
  if(width>0&&height>0){
  
  let widthSlice = svg.slice(svg.indexOf('width="'),svg.indexOf('width="')+11); 
  let heightSlice = svg.slice(svg.indexOf('height="'),svg.indexOf('height="')+12); 
  // let viewBoxSlice = svg.slice(svg.indexOf('viewBox="'),svg.indexOf('viewBox="')+21); 

  let newSvg: string = svg.replace(`${widthSlice}`, `width="${width}"`)
  newSvg = newSvg.replace(`${heightSlice}`, `height="${height}"`)


  
  // let newSvg: string = svg.replace(`${widthSlice}`, `width="200"`)
  // newSvg = newSvg.replace(`${heightSlice}`, `height="200"`)
  // newSvg = newSvg.replace(`${viewBoxSlice}`, `viewBox="0 0 350 350"`)
  
  return newSvg
  } else 
  return svg

}




export const createSvgToPDFComponent = (svgXml: string, width?:number, height?:number) => {
  
  return new Promise<ReactNode>((resolve) => {
     
      if (!svgXml || svgXml === "") return <></>;
      let svg = svgXml.replace(/px/g, "pt"); //replace all px with pt
  
      if (width!==undefined&&height!==undefined){// change size 
      svg = changeSvgSize(svg,width,height); }
  
      const parsed: RootNode = parse(svg);
      const svgElement = <>{svgToJSXWithRelPositioning(parsed.children[0])}</> as ReactNode;
      resolve(svgElement);
  })
}

/**
 * Convert SVG Xml to react-pdf svg
 * https://codesandbox.io/s/modern-bush-clihi
 * @param param0 
 * @returns 
 */
const SvgToPDFComponent = ({svgXml, width, height}:{svgXml: string, width?:number, height?:number}) => {
  const svgElement = useMemo(() => {
    if (!svgXml || svgXml === "") return <></>;
    let svg = svgXml.replace(/px/g, "pt"); //replace all px with pt

    if (width!==undefined&&height!==undefined){// change size 
    svg = changeSvgSize(svg,width,height); }

    const parsed: RootNode = parse(svg);
    return svgToJSXWithRelPositioning(parsed.children[0]);
  }, [svgXml]);
  return <>{svgElement}</>;
};

export default SvgToPDFComponent;