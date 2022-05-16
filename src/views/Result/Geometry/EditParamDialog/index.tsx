import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@mui/material/IconButton";
import { useGeometryContext } from "../GeometryContext";
import { EditParamDialogProvider } from "./EditParamDialogContext";
import InputMenu from "./InputMenu";
import InputView from "./InputView";

export default function EditParamDialog(): React.ReactElement {
  const { detailDialog,setDetailDialog } = useGeometryContext();
  const handleClose = () => {
    setDetailDialog(false);
  }
  return (
    <EditParamDialogProvider>
      <Dialog fullScreen open={detailDialog}>
        <AppBar position="static">
          <IconButton onClick={handleClose}>
            <span>閉じる</span>
          </IconButton>
        </AppBar>
        <InputMenu />
        <InputView />
      </Dialog>
    </EditParamDialogProvider>
  );
}