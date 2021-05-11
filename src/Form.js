import { useState } from "react";
import React, { Component }  from 'react';
import {
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Chip,
  MenuItem,
  Button,
} from "@material-ui/core";

import { options, dataTemplate } from "./data/options";
import { makeStyles } from "@material-ui/core/styles";
import faker from "faker";
import download from "downloadjs";

const categories = Object.keys(options);
// console.log(categories,options)
// const xyz = Object.values(options)
// console.log(xyz)
// console.log(options)
// console.log(categories);
// console.log(JSON.parse(options))

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const Form = (props) => {

  const classes = useStyles();
  const [data, setData] = useState(dataTemplate);
//   console.log(data)
  const [numberOfData, setNumberOfData] = useState(1);


  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    // console.log(event.target.name)
    // alert(event.target.value)
    // console.log(event.target.value)
    let copyData = { ...data };
    // let copyData = data
    // console.log(copyData)
    // console.log(copyData[event.target.name])
    copyData[event.target.name] = {};
    // event.target.value.forEach((item) => {
    //   copyData[event.target.name][item] = "";
    // });
   event.target.value.forEach((item)=>{
    //    console.log(item)
       return (
        copyData[event.target.name][item] = "xyz"
       )
   })
    setData(copyData);
  };

//   console.log(data)

  const generateData = () => {
    let copyData = JSON.parse(JSON.stringify(options));
    // console.log(copyData)
    let arrData = [];
    for (let i = 0; i < numberOfData; i++) {
      for (let category of categories) {
        //   console.log(category)
        for (let key of Object.keys(options[category])) {
          if (data[category][key] !== undefined) {
            copyData[category][key] = faker[category][key]();
          }
        }
      }
      arrData.push(copyData);
      copyData = JSON.parse(JSON.stringify(options));
    }
    download(JSON.stringify(arrData), "fake_data.json", "json");
    setNumberOfData(1);
    setData(dataTemplate);
  };

//   console.log(options)

  return (
    <>
      <Grid container spacing={2}>
        {
            categories.map((value)=>{
                // console.log(value)
                // console.log(Object.keys(data[value]))
                // console.log(Object.keys(data))
                return (
                    <>
                     <Grid item sm={3} key={value}>
                     <Paper component={Box} p={3}>
                     <FormControl className={classes.formControl}>
                     <InputLabel>{value}</InputLabel> 
                     <Select
                           name={value}
                           fullWidth
                           multiple
                          value={Object.keys(data[value])}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {
                          selected.map((value)=>{
                            //   console.log(value)
                              return (
                                <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              /> 
                              )
                          })
                      }
                    </div>
                  )}
                >
                    {/* {console.log(Object.keys(options[value]))} */}
                    {Object.keys(options[value]).map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>  
                    </FormControl>
                    </Paper> 
                     </Grid>
                    </>
                )
            })
        }
      </Grid>
      <Paper component={Box} my={1} p={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="enter the number of fake data"
          placeholder="Enter the number"
          value={numberOfData}
          onChange={(e) => setNumberOfData(e.target.value)}
        />
      </Paper>
      <Button variant="contained" color="secondary" onClick={generateData}>
        Generate Data
      </Button>
    </>
  );
};

export default Form;