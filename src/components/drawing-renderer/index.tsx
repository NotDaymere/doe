import { useRef, useEffect, FC } from 'react';
import testDrawing from './mockData';
import './index.less'

interface Stroke {
  start: { x: number; y: number };
  end: { x: number; y: number };
  width: number;
  color: string;
}

const Drawing: FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const parseXMLToStrokes = (xml: string): Stroke[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const strokeNodes = xmlDoc.getElementsByTagName('stroke');

    const strokes: Stroke[] = [];
    for (let i = 0; i < strokeNodes.length; i++) {
      const strokeNode = strokeNodes[i];
      const start = strokeNode.getElementsByTagName('start')[0];
      const end = strokeNode.getElementsByTagName('end')[0];

      const startX = parseFloat(start.getAttribute('x') || '0');
      const startY = parseFloat(start.getAttribute('y') || '0');
      const endX = parseFloat(end.getAttribute('x') || '0');
      const endY = parseFloat(end.getAttribute('y') || '0');
      const width = parseFloat(strokeNode.getElementsByTagName('width')[0].textContent || '1');
      const color = strokeNode.getElementsByTagName('color')[0].textContent || 'black';

      strokes.push({
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
        width,
        color,
      });
    }

    return strokes;
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const strokes = parseXMLToStrokes(testDrawing);

    svg.innerHTML = '';

    strokes.forEach(({ start, end, width, color }) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', start.x.toString());
      line.setAttribute('y1', start.y.toString());
      line.setAttribute('x2', end.x.toString());
      line.setAttribute('y2', end.y.toString());
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', width.toString());

      svg.appendChild(line);
    });
  }, [testDrawing]);

  return (
    <div className={'drawing-container'} style={{ width: "100%", height: "400px" }}>
      <svg className={'drawing'} ref={svgRef} />
    </div>
  );
};

export default Drawing;
