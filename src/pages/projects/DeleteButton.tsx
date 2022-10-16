import React from 'react';
import { GridCellParams } from "@material-ui/data-grid";
import Button from '@material-ui/core/Button';
import { deleteProjectData,deleteTherbData } from 'src/api/KeyRequests';

interface Props{
  params: GridCellParams["row"];
}
export default function DeleteButton({params}:Props):React.ReactElement{ 

  const handleClick = () =>{
    async function deleteProject(){
      const response1 = await deleteProjectData(params.id);
      const response2 = await deleteTherbData(params.id);
    }
    deleteProject();
  }

  return(
    <Button 
      variant="contained" 
      color="primary"
      onClick={handleClick}
    >
      削除
    </Button>
  )
}