import { useCallback, useState } from 'react';
import { LayerItem } from './LayerItem';
import update from 'immutability-helper';
import { Layer } from "building-editor-2d/Canvas";

function a11yProps(index: number | string): { id: string; 'aria-controls': string } {
  return {
      id: `floor-nav-${index}`,
      'aria-controls': `floor-nav-${index}`,
  };
}

interface Props {
  layers: Layer[];
}

export function LayerContainer(props:Props):React.ReactElement{
  const [layersState,setLayersState] =useState<Layer[]>([]);

  const moveLayer = useCallback((dragIndex: number, hoverIndex: number) => {
    setLayersState((prevLayers: Layer[]) =>
        update(prevLayers, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevLayers[dragIndex] as Layer],
            ],
        }),
    );
  }, []);

  const renderLayer = useCallback(
    (layer: Layer, index: number) => {
        return <LayerItem
            key={index}
            index={index}
            layer={layer}
            moveLayer={moveLayer}
      />;
  }, [moveLayer]);

  return(
    <div>
      {props.layers.map((layer:Layer,index:number)=>renderLayer(layer,index))}
    </div>
  )
}