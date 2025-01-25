
export const testTextAndCharts = `
<response>
<p><large-text>Example answer</large-text></p>
  <p><large-text>Example of displaying mathematical formulas</large-text></p>  
    <block-math>
    $$\\E = mc^2$$
  </block-math>
  <p>Here is another block of math:</p>
  <block-math>
    $$\\int_{0}^{1} (x^2 + 2x + 1) \\, dx = \\left[ \\frac{x^3}{3} + x^2 + x \\right]_{0}^{1} = 2$$
  </block-math>
  <p><large-text>Example of text display</large-text></p>  
  <p><bold>This is bold text</bold> and <italic>this is italic text this is italic text this is italic text this is italic text this is italic text</italic>.</p>
  <p>Here is a more complex block of code:</p>
  <p>Here is some inline math: <inline-math>$\\sqrt{n} = x$ where $n$ is a perfect square.</inline-math>.</p>
  <p>This is a block of math:</p>
  <p>Visit <link url="https://example.com">this link</link>.</p>
  <p>Here is a <quote>This is a quote.</quote></p>
  <p>This text is <strikethrough>strikethrough</strikethrough>.</p>
  <p>This text is <red>red</red> and this text is <blue>blue</blue>.</p>
  <p><medium-text>This is medium text</medium-text></p>
  <p><large-text>This is large text</large-text></p>
  <p>Here is some <sup>superscript</sup> and <sub>subscript</sub> text.</p>
  <p>Here is some <highlight>highlighted text</highlight>.</p>
  <p>Here is a tab: <tab /></p>
  <p><large-text>Waterfall Chart</large-text></p>
  <chart type="waterfall">
    <data>
      <categories>["Step 1", "Step 2", "Step 3"]</categories>
      <values>[100, -25, 75]</values>
    </data>
    <style>
      <colors>["#FF4848", "#FF704F", "#FE9202", "#8CCF18"]</colors>
    </style>
  </chart>
  <p><large-text>Pareto Chart</large-text></p>
  <chart type="pareto">
    <data>
      <categories>["Category 1", "Category 2", "Category 3"]</categories>
      <values>[100, 80, 50]</values>
    </data>
    <layout>
      <xaxis label="Categories"/>
      <yaxis label="Values"/>
    </layout>
    <style>
      <colors>["#FF4848", "#FE9202", "#30D6EB"]</colors>
    </style>
  </chart>
  <p><large-text>Venn Chart</large-text></p>
  <chart type="venn">
   <data>
     <sets>
       <set name="Set A" size="100"/>
       <set name="Set B" size="75"/>
     </sets>
   </data>
   <style>
    <colors>["#FF4848", "#30D6EB", "#8CCF18"]</colors>
   </style>
  </chart>
  <p><large-text>Heatmap Chart</large-text></p>
  <chart type="heatmap">
    <data>
      <matrix>
        <row>[1, 2, 3]</row>
        <row>[4, 5, 6]</row>
        <row>[7, 8, 9]</row>
      </matrix>
    </data>
    <layout>
      <xaxis label="X-Axis"/>
      <yaxis label="Y-Axis"/>
    </layout>
    <style>
      <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
    </style>
  </chart
  <p><large-text>Boxplot Chart</large-text></p>
  <chart type="boxplot">
      <data>
        <categories>["Category 1", "Category 2"]</categories>
        <values>[[1, 2, 3, 4, 5], [5, 6, 7, 8, 9]]</values>
      </data>
      <layout>
        <xaxis label="Categories"/>
        <yaxis label="Values"/>
      </layout>
      <style>
        <colors>["#FF4848", "#FF704F", "#FE9202"]</colors>
      </style>
  </chart>
  <p><large-text>Wordcloud Chart</large-text></p>
  <chart type="wordcloud">
    <data>
      <words>
        <word name="AI" size="50"/>
        <word name="Data" size="40"/>
        <word name="AI" size="50"/>
        <word name="Data" size="40"/>
        <word name="AI" size="50"/>
        <word name="Data" size="40"/>
      </words>
    </data>
    <style>
      <colors>["#FF4848", "#FF704F", "#FE9202", "#8CCF18", "#30D6EB"]</colors>
    </style>
  </chart>
  <p><large-text>Bullet Chart</large-text></p>
  <chart type="bullet">
    <data>
      <performance>[70]</performance>
      <target>[80]</target>
    </data>
    <style>
      <colors>["#FF4848", "#30D6EB"]</colors>
    </style>
  </chart>
  <p><large-text>Sunburst Chart</large-text></p>
<p><large-text>Radar Chart</large-text></p>
  <chart type="radar">
    <data>
      <categories>["Metric 1", "Metric 2", "Metric 3"]</categories>
      <values>[80, 60, 90]</values>
    </data>
    <style>
      <colors>["#FF4848", "#FF704F", "#FE9202", "#30D6EB"]</colors>
    </style>
  </chart>
<p><large-text>Funnel Chart</large-text></p>
  <chart type="funnel">
    <data>
      <stages>["Stage 1", "Stage 2", "Stage 3"]</stages>
      <values>[100, 75, 50]</values>
    </data>
    <style>
      <colors>["#FF4848", "#FE9202", "#8CCF18", "#30D6EB"]</colors>
    </style>
  </chart>
  <p><large-text>Violin Chart</large-text></p>
  <chart type="violin">
    <data>
      <categories>["Category 1", "Category 2"]</categories>
      <values>[[1, 2, 3, 4], [5, 6, 7, 8]]</values>
    </data>
    <layout>
      <xaxis label="Categories"/>
      <yaxis label="Values"/>
    </layout>
    <style>
      <colors>["#FF4848", "#FF704F", "#FE9202", "#8CCF18"]</colors>
    </style>
  </chart>
    <p><large-text>Candlestick Chart</large-text></p>
  <chart type="candlestick">
    <data>
      <timestamps>[1, 2, 3]</timestamps>
      <open>[100, 110, 105]</open>
      <high>[115, 120, 110]</high>
      <low>[95, 100, 98]</low>
      <close>[110, 105, 102]</close>
    </data>
    <style>
      <colors>["#FF4848", "#8CCF18"]</colors>
    </style>
  </chart>
  <p><large-text>Step Chart</large-text></p>
  <chart type="step">
    <data>
      <xvalues>[1, 2, 3, 4]</xvalues>
      <yvalues>[10, 15, 20, 25]</yvalues>
    </data>
    <layout>
      <xaxis label="Time"/>
      <yaxis label="Value"/>
    </layout>
    <style>
      <colors>["#FF4848", "#FE9202", "#8CCF18"]</colors>
    </style>
  </chart>
  <p><large-text>Sankey Chart</large-text></p>
  <chart type="sankey">
    <data>
      <nodes>
        <node name="Node 1"/>
        <node name="Node 2"/>
        <node name="Node 3"/>
        <node name="Node 4"/>
      </nodes>
      <links>
        <link source="Node 1" target="Node 2" value="10"/>
        <link source="Node 2" target="Node 4" value="20"/>
        <link source="Node 3" target="Node 1" value="30"/>
      </links>
    </data>
    <style>
      <colors>["#FF4848", "#FF704F", "#FE9202", "#8CCF18"]</colors>
    </style>
  </chart>
  <p><large-text>Treemap Chart</large-text></p>
  <chart type="treemap">
    <data>
      <categories>
        <category name="Category 1" value="100"/>
        <category name="Category 2" value="50"/>
      </categories>
    </data>
    <style>
      <colors>["#FF4848", "#FE9202", "#8CCF18", "#30D6EB"]</colors>
    </style>
  </chart>
  <p><large-text>Gantt Chart</large-text></p>
    <chart type="gantt">
      <data>
        <tasks>
          <task name="Task 1" start="2024-01-01" end="2024-01-10"/>
          <task name="Task 2" start="2024-01-05" end="2024-01-15"/>
        </tasks>
      </data>
      <style>
        <colors>["#FF4848", "#FF704F", "#FE9202"]</colors>
      </style>
    </chart>
    <p><large-text>Bubble Chart</large-text></p>
    <chart type="bubble">
        <data>
          <xvalues>[1, 2, 3, 4, 5]</xvalues>
          <yvalues>[10, 15, 8, 12, 20]</yvalues>
          <sizevalues>[100, 200, 300, 150, 250]</sizevalues>
        </data>
        <style>
          <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
        </style>
    </chart>
    <p><large-text>Bar Chart</large-text></p>
    <chart type="bar" orientation="vertical">
      <data>
        <categories>["Category 1", "Category 2", "Category 3"]</categories>
        <values>[10, 20, 15]</values>
      </data>
      <layout>
        <xaxis label="Categories"/>
        <yaxis label="Values"/>
      </layout>
      <style>
        <barwidth>0.5</barwidth>
        <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
      </style>
    </chart>
    <p><large-text>Line Chart</large-text></p>
    <chart type="line">
      <data>
        <xvalues>[1, 2, 3, 4, 5]</xvalues>
        <yvalues>[10, 15, 8, 12, 20]</yvalues>
      </data>
      <layout>
        <xaxis label="Time"/>
        <yaxis label="Value"/>
      </layout>
      <style>
        <linestyle>solid</linestyle>
        <pointmarkers>true</pointmarkers>
        <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
      </style>
    </chart>
    <p><large-text>Pie Chart</large-text></p>
    <chart type="pie">
      <data>
        <labels>["Slice 1", "Slice 2", "Slice 3"]</labels>
        <values>[20, 30, 50]</values>
      </data>
      <style>
        <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
      </style>
    </chart>
    <p><large-text>Donut Chart</large-text></p>
    <chart type="donut">
        <data>
          <labels>["Slice 1", "Slice 2", "Slice 3"]</labels>
          <values>[20, 30, 50]</values>
        </data>
        <style>
          <innerRadius>50%</innerRadius>
          <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
        </style>
    </chart>
    <p><large-text>Area Chart</large-text></p>
    <chart type="area">
        <data>
          <xvalues>[1, 2, 3, 4, 5]</xvalues>
          <yvalues>[10, 15, 8, 12, 20]</yvalues>
        </data>
        <layout>
          <xaxis label="Time"/>
          <yaxis label="Value"/>
        </layout>
        <style>
          <fill>true</fill>
          <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
        </style>
    </chart>
    <p><large-text>Scatter Chart</large-text></p>
    <chart type="scatter">
        <data>
          <xvalues>[1, 2, 3, 4, 5]</xvalues>
          <yvalues>[10, 15, 8, 12, 20]</yvalues>
        </data>
        <layout>
          <xaxis label="X-Axis"/>
          <yaxis label="Y-Axis"/>
        </layout>
        <style>
          <pointsize>10</pointsize>
          <colors>["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"]</colors>
        </style>
    </chart>
  <p><large-text>Example of displaying a code block</large-text></p>
<code-with-output>
    <block-code>
    <lang>python</lang>
    def greet():
    return 'Hello, World!'
    greet()
    </block-code>
    <output>
    Hello, World!
    </output>
  </code-with-output>
  <block-code>
    function calculateArea(radius) {
      if (radius <= 0) {
        throw new Error("Radius must be positive.");
      }
      return Math.PI * Math.pow(radius, 2);
    }

    const area = calculateArea(5);
    console.log("Area:", area);
  </block-code>
    <p>Here is some inline code: <inline-code>let y = 10;</inline-code>.</p>  
  
</response>
`
