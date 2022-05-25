import { FC, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Color, ColorPicker } from "material-ui-color";
import { Layer } from "building-editor-2d/Canvas";

export interface LayerProps {
    index: number;
    layer: Layer;
    moveLayer: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

const style = {
    padding: '2.5%',
    marginBottom: '.5rem',
    cursor: 'move',
    'textAlign': 'center',
    'borderRadius': "10px",
    'verticalAlign': 'middle',
    'backgroundColor': 'rgba(0,0,10,0.05)',
};


export const LayerItem: FC<LayerProps> = ({ index, layer, moveLayer }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: "Layer",
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveLayer(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "Layer",
        item: () => {
            return { index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;
    drag(drop(ref));

    const [, setColor] = useState<Color>();
    const colorChange = (color: Color) => {
        setColor(color);
        layer.color = "#" + color.hex;
    };
    layer.index = index;
    
    const [, setLock] = useState<boolean>(layer.isLocked);
    const lockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLock(event.target.checked);
        layer.isLocked = event.target.checked;
    };

    const [, setVisible] = useState<boolean>(layer.isVisible);
    const visibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisible(event.target.checked);
        layer.isVisible = event.target.checked;
    };

    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {layer.index + "FL: " + layer.name}
                </Grid>
                <Grid item xs={2}>
                    <ColorPicker value={layer.color} onChange={colorChange} hideTextfield/>
                </Grid>
                <Grid item xs={5}>
                    <FormControlLabel control={<Checkbox checked={layer.isLocked} onChange={lockChange}/>} label="Lock" />
                </Grid>
                <Grid item xs={5}>
                    <FormControlLabel control={<Checkbox checked={layer.isVisible} onChange={visibleChange}/>} label="Visible" />
                </Grid>
            </Grid>
        </div>
    );
};