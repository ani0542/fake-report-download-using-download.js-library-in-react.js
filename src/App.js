import "./styles/App.css";
import { Container } from "@material-ui/core";
import Form from "./Form";
import React, { Component }  from 'react';


function App() {
  return (
    <div>
        <Container>
          <Form/>
        </Container>
    </div>
  );
}

export default App;