import React from 'react';
import { GridCellParams } from "@material-ui/data-grid";
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

interface Props{
  params: GridCellParams["row"];
}
export default function DetailButton({params}:Props):React.ReactElement{ 
  const { replace } = useRouter();
  
  const handleClick = () =>{
    replace(`/timeseries/${params.id}`);
  }

  return(
    <Button 
      variant="contained" 
      color="primary"
      onClick={handleClick}
    >
      詳細
    </Button>
  )
}