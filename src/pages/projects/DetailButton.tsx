import React from 'react';
import { GridCellParams } from "@material-ui/data-grid";
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { getDownload } from 'src/api/KeyRequests';

interface Props{
  params: GridCellParams["row"];
}
export default function DetailButton({params}:Props):React.ReactElement{ 
  const { replace } = useRouter();
  
  const handleClick = () =>{
    //replace(`/timeseries/${params.id}`);
    async function download(){
      const response = await getDownload("png",params.id);
      replace(response.url);
    }
    const redirectUrl = download();
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