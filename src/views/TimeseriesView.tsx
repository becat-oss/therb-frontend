import React,{useEffect} from "react"
import { Line,Chart } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom';

// useEffect(()=>{
//   Chart.register(zoomPlugin);
// },[]);

const options={
  //maintainAspectRatio:false,
  responsive:false,
  scale:{
    xAxes:[{
      type:"time",
      time:{
        parser:'YYYY/MM/DD HH:mm',
        stepSize:720,
        displayFormats:{
          'hour':'MM/DD HH:mm'
        }
      }
    }]
  },
  plugins:{
    legend:{
      display:true,
      //position:'left',
      labels: {
        color: 'rgb(0, 0, 0)'
      }
    },
    // zoom:{
    //   enabled:true,
    //   mode:'x'
    // },
    // pan:{
    //   enabled:true,
    //   mode:'x'
    // }
  }
}

interface DataProps{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        pointRadius: number;
    }[];
}

export default function TimeseriesView(props:DataProps):React.ReactElement{
  console.log('props',props);
  return(
    <Line width={1200} height={500} data={props} options={options}></Line>
  ) 
}