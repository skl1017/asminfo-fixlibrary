import { useState, useEffect } from "react"
import { API_BASE_URL } from "../../constants/constants"
import Select from 'react-select'

export default function SearchOptions({optionEndpoint, callback}){

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await fetch(API_BASE_URL + optionEndpoint);
      const data = await result.json();
      setOptions(data.map(element => ({
        value: element.id,
        label: element.name
      })));
      console.log(data);
    } catch (e) {
      setOptions([]);
    }
  };
  fetchData();
}, [optionEndpoint]);



  return (
    <Select
      options={options}
      onChange={(selected) => {
        if (selected){
         callback(selected.value) 
        } else {
          callback(null)
        }}}
      inputValue={inputValue}
      onInputChange={(val) => {setInputValue(val)}}
      isClearable
    />
  );
}