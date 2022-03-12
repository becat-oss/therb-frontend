import { SidebarProvider } from "./SidebarContext";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useWindowSize } from "src/utils/useWindowSize";

export const sidebarWidth = 240;

const useStyles = makeStyles((theme:Theme)=>
    createStyles({
        drawer: {
            width: sidebarWidth,
            flexShrink:0
        },
        drawerPaper: {
            width:sidebarWidth,
            backgroundColor: 'transparent',
            border: 'none',
            height: 'auto'
        },
        drawerContainer:{
            maxHeight: window.innerHeight,
            overflowX: 'hidden'
        }
    })
)

interface Props {
    title?: string;
    children: React.ReactNode;
    anchor?: 'right'|'left';
    swipeable?: boolean;
}

function SidebarContent({children, title, anchor = 'right', swipeable = true}: Props): React.ReactElement {
    const classes = useStyles();
    const windowSize=useWindowSize();

    return (
        <Drawer 
        className={classes.drawer} 
        variant = "permanent"
        classes = {{
            paper: classes.drawerPaper
        }}
        PaperProps={{style:{maxHeight:windowSize.height}}}
        anchor={anchor}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                {children}
            </div>
                
        </Drawer>
    )
}

export default function Sidebar(props: Props): React.ReactElement{
    return (
        <SidebarProvider>
           <SidebarContent {...props}/> 
        </SidebarProvider>
    )
}