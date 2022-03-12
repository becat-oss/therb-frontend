import ReactDOM from 'react-dom';
import React, { useRef, useState, Props, useCallback } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { useAppContext } from 'src/AppContext';
import { gridProps } from 'src/AppTypes';
import { DataGrid, GridColumns,GridRowData,GridCellValue, GridEditCellPropsParams } from '@material-ui/data-grid'

import { DataSheetGrid,keyColumn,textColumn } from 'react-datasheet-grid';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme)=>{
    return{
        root:{
            '& .Mui-error': {
                backgroundColor: `rgb(126,10,15,0.1)`
            }
        }
    }
})

//use react-datasheet-grid
// export default function Datasheet(){
//     const [ data,setData ] = useState([
//         {spaceType:'office',LPD:'1',smallPower:'1'},
//         {spaceType:'retail',LPD:'1',smallPower:'1'}
//     ])

//     const columns = [
//         {
//             ...keyColumn('spaceType',textColumn),
//             title:'Space Type'
//         },
//         {
//             ...keyColumn('LPD',textColumn),
//             title:'LPD'
//         },
//         {
//             ...keyColumn('Small Power',textColumn),
//             title:'Small Power'
//         }
//     ]

//     return(
//         <DataSheetGrid 
//             data={data}
//             onChange={setData}
//             columns = {columns}
//         />
//     )
// }

//use material ui data grid
// const columns = [
//     { field: 'name', headerName: 'Name', width: 180, editable: true },
//     { field: 'age', headerName: 'Age', type: 'number', editable: true },
//     {
//       field: 'temperature',
//       headerName: 'temperature',
//       type: 'number',
//       width: 180,
//       editable: true,
//     }
//   ];
//   const rows = [
//     {
//       id: 1,
//       name: 'test',
//       age: 25,
//       temperature: 34,
//     },
//     {
//       id: 2,
//       name: 'test2',
//       age: 36,
//       temperature: 36,
//     },
//   ]
interface DatasheetProps{
    columns:GridColumns
    initialRows:GridRowData[]
}

interface Threshold {
    min: number;
    max: number;
}
interface LoadThreshold {
    [key:string]:Threshold
}

function validateSetting(field:string,value:GridCellValue){
    if (typeof value !== "string"){
        return false
    }

    const threshold:LoadThreshold={
        coolingSetPt:{min:10,max:30},
        heatingSetPt:{min:15,max:35},
        pplDensity:{min:0,max:5},
        oaPerson:{min:0,max:0.1},
        oaArea:{min:0,max:0.1},
        smallPower:{min:0,max:100},
        lighting:{min:0,max:30},
    }
    console.log('value',value);

    try{
        const valueNumber=Number(value);
        return valueNumber>=threshold[field].min && valueNumber <= threshold[field].max
    }catch{
        return false
    }
}

export default function Datasheet({columns,initialRows}:DatasheetProps){
    //const apiRef = useGridApiRef(); useGridApiRefを使うのは最後の手らしい
    const [rows,setRows]=useState(initialRows);
    const classes = useStyles();
    

    const handleEditCellChangeCommited = React.useCallback(
        ({id,field,props}:GridEditCellPropsParams)=>{
            console.log('GridEditCellPropsParams',id,field,props);
            const updateRows = rows.map((row)=>{
                if (row.id===id){
                    const isValid = validateSetting(field, props.value);
                    console.log('isValid',isValid);
                    console.log('row',row);
                    row[field]=Number(props.value);
                    // @ts-ignore
                    row.error=!isValid;
                    
                    return row
                }
                return row
            })
            console.log('pdateRows',updateRows);
            setRows(updateRows);
    },[rows])

    return(
        <DataGrid 
            className={classes.root}
            rows={rows} 
            columns={columns}
            onEditCellChangeCommitted = {handleEditCellChangeCommited}
        />
    )
}

//use react datasheet
// const Datasheet: React.FC<gridProps> = ({grid}) => {

//     //const []
//     const onCellsChanged = (changes) => changes.forEach(({cell, row, col, value})=>
//         //console.log(cell, row, col, value)
//         grid[row][col]={ ...grid[row][col], value }
//         );

//     return(
//         <ReactDataSheet 
//           data={grid} valueRenderer={cell=>cell.value}
//           onCellsChanged = {onCellsChanged}
//         /> 
//     )
// }

// export default Datasheet