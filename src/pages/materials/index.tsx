import React from "react"
import Layout from "src/components/Layout"
import InputMaterialForm from "./inputMaterialForm"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function Material(): React.ReactElement{
    const baseSidebarWidth =100;
    return(
        <Container sx={{ marginLeft: `${baseSidebarWidth}px`, mr: 1, pt: 2, width: `calc(100% - ${baseSidebarWidth}px)` }}>
            <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ConstructionForm title="外壁" construction="wall" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ConstructionForm title="屋根" construction="roof" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ConstructionForm title="内壁" construction="floor" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <WindowForm title={t('window')} />
                </Grid>
            </Grid>
        </Container>
    )
}