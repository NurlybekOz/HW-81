import { ToastContainer } from 'react-toastify';
import './App.css'
import {Container} from "@mui/material";
import Links from "./features/links/Links.tsx";

const App = () => {

  return (

      <Container>
        <ToastContainer/>
        <Links/>
      </Container>
  )
};

export default App
