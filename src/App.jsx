import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {useTheme, ThemeProvider, createTheme, css} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './App.css';
import ContentBoard from "./components/ContentBoard.jsx";
import {Add} from "@mui/icons-material";
import {Fab} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTaskData} from "./redux-toolkit/slices/taskSlice.js";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const storedTheme = localStorage.getItem('colorMode');

function App() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

  return (
      <Box
          sx={{
              width: '100vw',
              minHeight: '100vh',
              height: 'fit-content',
              // height: '100vh',
              bgcolor: 'background.default',
              color: 'text.primary',
              boxSizing: 'border-box',
              overflowX: 'hidden'
          }}>

          <AppBar position="static">
              <Toolbar variant="dense" sx={{display:'flex', justifyContent:'space-between', }}>
                  <Typography variant="h6" color="inherit">
                      TaskMaster
                  </Typography>
                  <IconButton sx={{float:'right', ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
              </Toolbar>
          </AppBar>
          <ContentBoard/>
          <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              bottom: 0,
              position: 'static',
              width: '100%',
              paddingBottom:'10px'
          }}>

              <Typography variant="body2" color="text.secondary" align="center">
                  © 2024 TaskMaster
              </Typography>
          </Box>

      </Box>
  )
}


export default function ToggleColorMode() {
    const [mode, setMode] = React.useState(storedTheme!=null? storedTheme : 'light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    localStorage.setItem('colorMode', mode);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    const taskCardData = useSelector((state) => state.task)
    const dispatch = useDispatch()
    function addTaskCard() {
        let newCard ={
            id: taskCardData[taskCardData.length-1].id + 1,
            title: 'New Task Card',
            favourite: false,
            archived: false,
            tasks: [],
        }
        dispatch(addTaskData(newCard))
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <App />
                <Fab sx={{
                    position: 'fixed',
                    bottom: '7vh',
                    left: '92vw',
                }} color="primary" aria-label="add"
                     onClick={addTaskCard}>
                    <Add />
                </Fab>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
// export default App
