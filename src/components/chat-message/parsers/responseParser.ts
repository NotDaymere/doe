import { App } from "src/types";

export const responseParser = (xmlString: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  const parserError = xmlDoc.querySelector('parsererror');

  if (parserError) {
    throw new Error('Invalid XML');
  }

  const response = xmlDoc.getElementsByTagName('response')[0];

  if (!response) {
    throw new Error('No response found');
  }

  const responseChildrenArr = Array.from(response.children);

  return childrenParser(responseChildrenArr);
}

const childrenParser = (elements: Element[]) => {
  const result = elements.map(element => {
    switch (element.tagName) {
      case 'chart':
        return getChart(element);
      default:
        return 'Unknown element';
    }
  })

  return result
}

const getChart = (element: Element) => {
  const typeAttribute = element.getAttribute('type') as App.ChartType;
  const dataElement = element.getElementsByTagName('data')[0];
  const layoutElement = element.getElementsByTagName('layout')[0];
  const styleElement = element.getElementsByTagName('style')[0];

  const data = Array.from(dataElement.children);
  const layout = layoutElement ? Array.from(layoutElement.children) : undefined;
  const style = Array.from(styleElement.children);
  
  return {
    type: typeAttribute,
    data,
    layout,
    style
  }
}