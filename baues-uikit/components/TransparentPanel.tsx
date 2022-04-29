import React from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';

type TransparentPanelProps = PaperProps;

export default function TransparentPanel({ sx, ...others }: TransparentPanelProps): React.ReactElement {
  return <Paper sx={{ backgroundColor: (theme) => `rgba(0, 0, 10, ${theme.palette.mode === 'dark' ? 0.7 : 0.05})`, ...sx }} {...others} />;
}
