import { gridProps,cellType, AnalysisParameters,spaceTypeSetting,load } from 'src/AppTypes';
import parameters from '../parameters.json';
import { GridColumns, GridRowsProp,GridRowData } from '@material-ui/data-grid';
//type spaceType = keyof AnalysisParameters['load'];
//const spaceType = Object.keys(parameters['load']);

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

interface LoadGridRowData extends GridRowData{
    spaceType: string;
    coolingSetPt: number;
    heatingSetPt: number;
    pplDensity: number;
    oaPerson: number;
    oaArea: number;
    smallPower: number;
    lighting: number;
};

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
    efAch: number;
    efDeltaPressure: number;

    constructor(params:spaceTypeSetting,spaceType: string){
        this.spaceType = spaceType;
        this.coolingSetPt = params.cooling_setpt;
        this.heatingSetPt = params.heating_setpt;
        this.pplDensity = params.ppl_density;
        this.oaPerson = params.oa_person;
        this.oaArea = params.oa_area;
        this.smallPower = params.smallpower;
        this.lighting = params.lighting;
        this.hvac = params.hvac;
        this.efAch = params.ef_ach;
        this.efDeltaPressure = params.ef_deltapressure;
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
            lighting: this.lighting
        }
        return dataRow
        //react-datasheet用のデータ形式
        // let rowData:cellType[]=[
        //     {readOnly: true, value:this.spaceType},
        //     {value:this.coolingSetPt},
        //     {value:this.heatingSetPt},
        //     {value:this.pplDensity},
        //     {value:this.oaPerson},
        //     {value:this.oaArea},
        //     {value:this.smallPower},
        //     {value:this.lighting}
        // ];
        //return rowData
    }

    public toAnalysisParam():spaceTypeSetting{
        return {
            cooling_setpt: this.coolingSetPt,
            heating_setpt: this.heatingSetPt,
            ppl_density: this.pplDensity,
            oa_person: this.oaPerson,
            oa_area: this.oaArea,
            smallpower: this.smallPower,
            lighting: this.lighting,
            hvac: this.hvac,
            ef_ach: this.efAch,
            ef_deltapressure: this.efDeltaPressure
        }
    }
}

export default class AnalysisParams {
    load:{[key:string]:LoadParams};
    schedule:{};
    envelope:{};
    others:{};
    airside:{};
    plant:{};

    constructor(parameter: AnalysisParameters){
        this.schedule = parameter.schedule;
        this.envelope = parameter.envelope;
        this.others = parameter.others;
        this.airside = parameter.airside;
        this.plant = parameter.plant;
        this.load ={};
        Object.entries(parameters.load).forEach(([sp,setting])=>{
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
                    cooling_setpt: Number(param.coolingSetPt),
                    heating_setpt: Number(param.heatingSetPt),
                    ppl_density: Number(param.pplDensity),
                    oa_person: Number(param.oaPerson),
                    oa_area: Number(param.oaArea),
                    smallpower: Number(param.smallPower),
                    lighting: Number(param.lighting),
                    hvac: 'VRV',
                    ef_ach: 0,
                    ef_deltapressure: 0
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

    public toAnalysisParam():AnalysisParameters{
        const load:load = {}
        Object.keys(parameters.load).forEach(sp=>{
            load[sp]=this.load[sp].toAnalysisParam()
        })
        return {
            load: load,
            schedule: this.schedule,
            envelope: this.envelope,
            others: this.others,
            airside: this.airside,
            plant: this.plant,
        }
    }
}