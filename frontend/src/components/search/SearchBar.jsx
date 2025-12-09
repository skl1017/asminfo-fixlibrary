import { useState, useEffect } from "react";
import {API_BASE_URL} from "../../constants/constants"
import SearchOptions from "./SearchOptions";
import buildUrl from "../../utils/buildUrl";

export default function SearchBar({setSearchResults}){



  const [searchParameters, setSearchParameters] = useState({
          name: null,
          category_id: null,
          vendor_id: null
      })
      useEffect(()=>{
        const fetchData = async ()=>{
          try {
            if (!searchParameters.name && !searchParameters.category_id && !searchParameters.vendor_id){
              setSearchResults([])
              return
            }
            const url = buildUrl(API_BASE_URL + '/devices/search', searchParameters)
            const result = await fetch(url)
            const data = await result.json()
            setSearchResults(data)
          } catch(err){
            throw(err)
          }
        }
        fetchData()
      }, [searchParameters])

    return (
        <div className="flex gap-6">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border p-2 rounded"
            onChange={(e)=>{
              setSearchParameters({...searchParameters, name:e.target.value})
            }}
            />
          <SearchOptions
            optionEndpoint={'/categories'}
            callback={(toChange)=>{setSearchParameters({...searchParameters, category_id:toChange})}}
          />
          <SearchOptions
            optionEndpoint={'/vendors'}
            callback={(toChange)=>{setSearchParameters({...searchParameters, vendor_id:toChange})}}
          />
        </div>

    )
}