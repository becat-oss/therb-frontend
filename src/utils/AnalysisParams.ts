import { gridProps,cellType, SpaceTypeSetting, SpaceTypeParams, Program, ProgramParams, programs,ScheduleGroup,scheduleGroupKeys, scheduleSetKeys } from 'src/AppTypes';
import { spaceTypeParams } from 'src/parameters';
import { GridColumns, GridRowsProp,GridRowData } from '@mui/x-data-grid';
import { String } from 'lodash';

const loadHeaders = [
  'spaceType',
  'coolingSetPt',
  'heatingSetPt',
  'pplDensity',
  'oaPerson',
  'oaArea',
  'smallPower',
  'lighting'
]

const scheduleHeaders = [
  'program',
  'type',
  'date',
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]

const scheduleHeaderTest = [
  'program',
  'type',
  'date',
  'schedule'
]

export interface LoadGridRowData extends GridRowData{
  spaceType: string;
  coolingSetPt: number;
  heatingSetPt: number;
  pplDensity: number;
  oaPerson: number;
  oaArea: number;
  smallPower: number;
  lighting: number;
};

export class ScheduleParam{
  program: Program;
  type: string;
  date: string;
  schedule: number[];

  constructor(program: Program, type: string, date: string, schedule: number[]){
    this.program = program;
    this.type = type;
    this.date = date;
    this.schedule = schedule;
  }

  public toDataRow(): ScheduleGridRowData{
    return {
      program: this.program,
      type: this.type,
      date: this.date,
      schedule: this.schedule,
      '0:00': this.schedule[0],
      '1:00': this.schedule[1],
      '2:00': this.schedule[2],
      '3:00': this.schedule[3],
      '4:00': this.schedule[4],
      '5:00': this.schedule[5],
      '6:00': this.schedule[6],
      '7:00': this.schedule[7],
      '8:00': this.schedule[8],
      '9:00': this.schedule[9],
      '10:00': this.schedule[10],
      '11:00': this.schedule[11],
      '12:00': this.schedule[12],
      '13:00': this.schedule[13],
      '14:00': this.schedule[14],
      '15:00': this.schedule[15],
      '16:00': this.schedule[16],
      '17:00': this.schedule[17],
      '18:00': this.schedule[18],
      '19:00': this.schedule[19],
      '20:00': this.schedule[20],
      '21:00': this.schedule[21],
      '22:00': this.schedule[22],
      '23:00': this.schedule[23]
    }
  }
}

export class LoadParams {
    spaceType: string;
    coolingSetPt: number;
    heatingSetPt: number;
    pplDensity: number;
    oaPerson: number;
    oaArea: number;
    smallPower: number;
    lighting: number;
    hvac: string;
    coolingCop: number;
    heatingCop: number;

    constructor(params:SpaceTypeSetting,spaceType: string){
        this.spaceType = spaceType;
        this.coolingSetPt = params.coolingSetpt;
        this.heatingSetPt = params.heatingSetpt;
        this.pplDensity = params.pplDensity;
        this.oaPerson = params.oaPerson;
        this.oaArea = params.oaArea;
        this.smallPower = params.smallPower;
        this.lighting = params.lighting;
        this.hvac = params.hvac;
        this.coolingCop = params.coolingCop;
        this.heatingCop = params.heatingCop;
    }

    public toDataRow():LoadGridRowData{
        //material-ui/data-grid用のデータ形式
        const dataRow = {
            spaceType: this.spaceType,
            coolingSetPt:this.coolingSetPt,
            heatingSetPt:this.heatingSetPt,
            pplDensity: this.pplDensity,
            oaPerson: this.oaPerson,
            oaArea: this.oaArea,
            smallPower: this.smallPower,
            lighting: this.lighting,
            coolingCop: this.coolingCop,
            heatingCop: this.heatingCop,
        }
        return dataRow
    }

    public toAnalysisParam():SpaceTypeSetting{
        return {
            coolingSetpt: this.coolingSetPt,
            heatingSetpt: this.heatingSetPt,
            pplDensity: this.pplDensity,
            oaPerson: this.oaPerson,
            oaArea: this.oaArea,
            smallPower: this.smallPower,
            lighting: this.lighting,
            hvac: this.hvac,
            coolingCop: this.coolingCop,
            heatingCop: this.heatingCop,
        }
    }
}

export interface ScheduleGridRowData extends GridRowData{
  program: Program;
  type: string;
  date: string;
  //schedule: number[];
  '0:00': number;
  '1:00': number;
  '2:00': number;
  '3:00': number;
  '4:00': number;
  '5:00': number;
  '6:00': number;
  '7:00': number;
  '8:00': number;
  '9:00': number;
  '10:00': number;
  '11:00': number;
  '12:00': number;
  '13:00': number;
  '14:00': number;
  '15:00': number;
  '16:00': number;
  '17:00': number;
  '18:00': number;
  '19:00': number;
  '20:00': number;
  '21:00': number;
  '22:00': number;
  '23:00': number;
}

//TODO: ToDatasheetはbase classで作って継承する形にしたい
export class ScheduleParams{
  schedule:{[key:string]:ScheduleParam};

  constructor(parameter: ProgramParams){
    this.schedule ={};
    programs.forEach((program)=>{
      scheduleGroupKeys.forEach((type)=>{
        scheduleSetKeys.forEach((date)=>{
          const keyName = `${program}_${type}_${date}`;
          this.schedule[keyName] = new ScheduleParam(program,type,date,parameter[program][type][date].schedule);
        })
      })
    })
  }

  // public fromDataSheet(scheduleRow:ScheduleGridRowData[]):ProgramParams{
  //   // @ts-ignore 
  //   const programParams:ProgramParams = {};
  //   scheduleRow.forEach((row)=>{
  //     const schedule = [row['0:00'],row['1:00'],row['2:00'],row['3:00'],row['4:00'],row['5:00'],row['6:00'],row['7:00'],row['8:00'],row['9:00'],row['10:00'],row['11:00'],row['12:00'],row['13:00'],row['14:00'],row['15:00'],row['16:00'],row['17:00'],row['18:00'],row['19:00'],row['20:00'],row['21:00'],row['22:00'],row['23:00']];
  //     // @ts-ignore 
  //     programParams[row.program][row.type][row.date] = {schedule:schedule};
  //   })
  //   return programParams;
  // }

  public toDataSheet(){
    const columns:GridColumns = scheduleHeaders.map((param)=>{
      if (param=='program'||param=='type'||param=='date'){
        return {
          field:param,
          headerName:param,
          width:200,
          minWidth:100,
          sortable:false,
          editable:false,
          flex:1
        }
      }else{
        return {
          field:param,
          headerName:param,
          width:200,
          minWidth:50,
          sortable:false,
          editable:true,
          flex:1
        }
      }
    })

    const rows:ScheduleGridRowData[] = [];
    Object.values(this.schedule).forEach((program,i)=>{
      const row = Object.assign(program.toDataRow(),{
        id:i
      });
      rows.push(row);
    });

    return {columns,rows};
  }

  

}


export default class AnalysisParams {
  load:{[key:string]:LoadParams};

  constructor(parameter: SpaceTypeParams){
    this.load ={};
    Object.entries(spaceTypeParams).forEach(([sp,setting])=>{
      this.load[sp]=new LoadParams(setting,sp);
    })
  }

  public loadToDataSheet(){
      //material-ui/data-grid用のデータ形式
      
      const paramLength= loadHeaders.length;
      const columns: GridColumns = loadHeaders.map(param=>{
          if (param=='spaceType'){
              //spaceTypeは編集できない
              return{
                  field: param, 
                  headerName: param, 
                  width: 1500/paramLength,//うまい設定方法募集
                  editable: false
              }
          }
          return {
              field: param, 
              headerName: param, 
              width: 1500/paramLength,//うまい設定方法募集
              editable: true
          }
      });

      const rows:LoadGridRowData[]=[]
      Object.values(this.load).forEach((load,i)=>{
          const row=Object.assign(load.toDataRow(),{
              id:i,
              error:false
          })
          rows.push(row);
      })

      return {columns: columns,rows: rows}
      //react-datasheet用のデータ形式
      // const headerParams = ['','coolingSetPt','heatingSetPt','pplDesnsity','oaPerson','oaArea','smallPower','lighting']
      // const header:cellType[] = headerParams.map(param=>{
      //     return {readOnly: true,value:param}
      // })

      // let gridData=[header];
      // for (const [spaceType,loadParam] of Object.entries(this.load)){     
      //     gridData.push(loadParam.toDataRow());
      // }

      // return gridData
  }

  public loadFromDataSheet(loadData:LoadGridRowData[]):void{

      loadData.forEach(param=>{
          this.load[param.spaceType]=new LoadParams(
              {
                  coolingSetpt: Number(param.coolingSetPt),
                  heatingSetpt: Number(param.heatingSetPt),
                  pplDensity: Number(param.pplDensity),
                  oaPerson: Number(param.oaPerson),
                  oaArea: Number(param.oaArea),
                  smallPower: Number(param.smallPower),
                  lighting: Number(param.lighting),
                  hvac: 'VRV',
                  coolingCop: 3.5,
                  heatingCop: 3.5,
              },
              String(param.spaceType)
          )
      })
      //react-datasheet用のデータ形式
      // for (let i = 1; i<data.length; i++){
      //     const rowData=data[i]
      //     this.load[rowData[0].value]=new LoadParams(
      //         {
      //             cooling_setpt: Number(rowData[1].value),
      //             heating_setpt: Number(rowData[2].value),
      //             ppl_density: Number(rowData[3].value),
      //             oa_person: Number(rowData[4].value),
      //             oa_area: Number(rowData[5].value),
      //             smallpower: Number(rowData[6].value),
      //             lighting: Number(rowData[7].value),
      //             hvac: 'VRV',
      //             ef_ach: 0,
      //             ef_deltapressure: 0
      //         },
      //         String(rowData[0].value)
      //     )
      // }
  }

  public toAnalysisParam():SpaceTypeParams{
      const load:SpaceTypeParams = {}
      Object.keys(spaceTypeParams.load).forEach(sp=>{
          load[sp]=this.load[sp].toAnalysisParam()
      })

      return load;
      // return {
      //     load: load,
      //     // schedule: this.schedule,
      //     // envelope: this.envelope,
      //     // others: this.others,
      //     // airside: this.airside,
      //     // plant: this.plant,
      // }
  }
}