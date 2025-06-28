import Papa from "papaparse";
import Databox from "../Databox/Databox";
import CustomChartBar from "./components/CustomBarChart";
import "./UploadChartBody.less";
import { useRef, useState, useEffect } from "react";

import CustomLineChart from "./components/CustomLineChart";
import CustomBubbleChart from "./components/CustomBubbleChart";
import CustomScatterChart from "./components/CustomScatterChart";
import CustomDonutChart from "./components/CustomDonutChart";
import CustomPieChart from "./components/CustomPieChart";
import CustomAreaChart from "./components/CustomAreaChart";


function UploadChartBody({chartType}: { chartType: string }) {
    const fileInputRef = useRef(null);
    const [data, setData] = useState([]);
  
    const [chartData, setChartData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);


   
    const getChartComponent = (chartType:string = "Pie",data?:any) => {
        switch (chartType) {
            case "Bar":
            return <CustomChartBar data={data} />;
        
            case "Donut":
            return <CustomDonutChart data={data} />;
            case "Line":   
            return <CustomLineChart data={data} />;
            case "Bubble":
            return <CustomBubbleChart data={data} />;
            case "Scatter":
            return <CustomScatterChart data={data} />;
           
            case "Pie":
            return <CustomPieChart data={data} />;
            case "Area":
            return <CustomAreaChart data={data} />; 
        }
  
    }
    useEffect(() => { 
      
        loadDefaultData();
    }, []);

    
    const loadDefaultData = async () => {
  
        try {
            setIsLoading(true);       
            const response = await fetch("/temp/data.csv");
      
            if (!response.ok) {
                throw new Error(
               
                    `Failed to load default data: ${response.status} ${response.statusText}`
    
                );
            }

            const csvText = await response.text();
            
            Papa.parse(csvText, {
                header: true,
                dynamicTyping: true,
                complete: (result) => {
    
                    console.log("Default CSV Data:", result.data);
                    if (result.data && result.data.length > 0) {    
                        const firstRow = result.data[0];
                        const formattedData = Object.keys(firstRow).map((key, index) => ({
                    
                            group: key,
                            value: firstRow[key] || 0,

                            
                            label: String(firstRow[key] || 0),
                            color: generateColor(index),
                        }));
          
                        setData(formattedData);
   
                        setChartData(formattedData);
                    
                        
                        console.log("Default Formatted Chart Data:", formattedData);
                    }
                    setIsLoading(false);
               
                },
                error: (error) => {
              
                    console.error("Error parsing default CSV file:", error);
                    setIsLoading(false);
   
                },
            });
        } catch (error) {
            
            console.error("Error loading default data:", error);
          

            setIsLoading(false);
        }
    };

   
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
      
        if (file) {
          
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (result) => {
           
                    console.log("Parsed CSV Result:", result.data);
                    if (result.data && result.data.length > 0) {
        
                        const firstRow = result.data[0];
           
                        const formattedData = Object.keys(firstRow).map((key, index) => ({
                            group: key,

   
           
                            value: firstRow[key] || 0,
                            label: String(firstRow[key] || 0),
                            color: generateColor(index),
                        }));
   
                        setData(formattedData);
                        setChartData(formattedData);
                        console.log("Formatted Chart Data:", formattedData);
                    }
   

                },

                error: (error) => {
       
                    console.error("Error parsing CSV file:", error);
                },
            });
        }
   
    };

    const generateColor = (index) => {
        const colors = ["#FFDB65", "#BEE380", "#FFB364", "#A0D2DB"];
       
        return colors[index % colors.length];
    };

    return (


<div className="edit_contanier">
   
            <div className="left">
       
                <p>Edit Data</p>
                {isLoading ? (

<p>Loading default data...</p>
         
        ) : (

            data.map((item, index) => (
                        <Databox
       
                        key={index}
   
                            title={item.group}
                            color={item.color}
    
                            valueNumber={item.value}
                        />


                    ))
       
       )}
                <div className="scalebox">
                    <p>Scale</p>
   
                    <div className="numbers">
                        <p>0</p>
                        <p>500</p>
                        <p>1500</p>
        
    
                        <p>2000</p>
                    </div>
                </div>
    
                <button onClick={handleButtonClick}>
                    <img src="/img/icons/file_upload.svg" alt="Upload Icon" /> Upload your data
                </button>
                <input
               
               type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
     
                    accept=".csv"
   
   />
            </div>
     
            <div className="right">
         
                <div className="right-inner">
                    {isLoading ? <p>Loading chart...</p> : getChartComponent(chartType, chartData)}
     
                </div> 
            </div>

   
     
        </div>
    );
}
export default UploadChartBody;