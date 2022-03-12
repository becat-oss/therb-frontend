import React from 'react';
import { AppProvider } from 'src/AppContext';
import Header from './Header';
import Stepper from './Stepper';

interface LayoutProps{
    children: React.ReactNode;
}
export default function Layout(props: LayoutProps):React.ReactElement {
    const { children }=props;
    
    return(
        <AppProvider>
            <Header />
            {children}
            <Stepper />
        </AppProvider>
        
    )
}