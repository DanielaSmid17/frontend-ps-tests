import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";

import {ThemeProvider} from "@material-ui/core/styles";
import theme from './components/ui/Theme'

function App() {
  return (
   <ThemeProvider theme={theme}>
     <Header />

   </ThemeProvider>
  );
}

export default App;
