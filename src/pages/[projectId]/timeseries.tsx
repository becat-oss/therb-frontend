import React,{useEffect} from "react"
import { Line,Chart } from 'react-chartjs-2'
//import Chart from 'chart.js'
import Legend from "src/components/Legend"
import Layout from 'src/components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from "next/dynamic";

interface TimeseriesProps{
    "results":resultResData
}

interface resultResData{
    "data":roomData[]
}

interface projectResData{
  "data":projectData[]
}

interface projectData{
  "id":number
  "name":string
}

interface roomData{
  "roomId": number
  "results":haspData
}

interface haspData{
  "hour":string[]
  "roomT":number[]
  "clodS":number[]
  "rhexS":number[]
  "ahexS":number[]
  "fs":number[]
  "clodL":number[]
  "rhexL":number[]
  "ahexL":number[]
  "fl":number[]
  "mrt":number[]
}

const dynamicData=function(result:haspData){

  const config={
    labels:result.hour,
    datasets:[
      {
        label:"室温",
        data:result.roomT,
        backgroundColor: "rgb(255, 99, 132)",
        pointRadius:1
      },
      {
        label:"clodS",
        data:result.clodS,
        backgroundColor: "rgb(255, 0, 0)",
        pointRadius:1
      },
      {
        label:"rhexS",
        data:result.rhexS,
        backgroundColor: "rgb(0, 255, 0)",
        pointRadius:1
      },
      {
        label:"ahexS",
        data:result.ahexS,
        backgroundColor: "rgb(0, 0, 255)",
        pointRadius:1
      },
      {
        label:"fs",
        data:result.fs,
        backgroundColor: "rgb(100, 100, 100)",
        pointRadius:1
      },
      {
        label:"mrt",
        data:result.mrt,
        backgroundColor: "rgb(200, 200, 200)",
        pointRadius:1
      },
    ]
  }
  
  return config
}
const TimeseriesView = dynamic(() => import('../../views/TimeseriesView'), { ssr: false });
export default function Timeseries(props:TimeseriesProps):React.ReactElement{
    const data1=dynamicData(props.results.data['0'].results)
    console.log('data1',data1)
    return (
        <>
          <Layout>
            <TimeseriesView {...data1}/>
          </Layout>
        </>
    )
}

export const getStaticProps:GetStaticProps=async({params})=>{
    const res=await fetch(`http://localhost:5000/results/${params.projectId}`)
    const results=await res.json()

    return{
        props:{
            results:results
        }
    }
}

type ParsedUrlQuery={[key:string]:string}
type Path ={params:ParsedUrlQuery}
type Paths =Path[]
interface idSet{
  id: number
  name: string
}

//serverからプロジェクトを取得する
async function getProjects():Promise<Paths>{
  const paths:Paths=[];
  const res = await fetch('http://localhost:5000/projects')
  const ids:projectResData = await res.json()

  console.log("ids",ids)

  ids.data.forEach((id:idSet)=>{
    const path:Path={
      params:{
        projectId:String(id.id),
      }
    }
    paths.push(path);
  })

  return paths;
}

export const getStaticPaths:GetStaticPaths=async()=>{
  const paths = await getProjects();

  return{
    paths:paths,
    fallback: false
  }
}
