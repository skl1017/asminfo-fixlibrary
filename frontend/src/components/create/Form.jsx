import { useEffect, useState } from "react";
import SearchOptions from "../search/SearchOptions";

export default function Form({ form }) {
  const [deviceData, setDeviceData] = useState(
    Object.fromEntries(form.fields.map((field)=>([field.key, field.value])))
  );
  useEffect(()=>{
      console.log(deviceData)
  }, [deviceData])

  return (
      <div>
        <h2 className="text-3xl font-bold">Créer un appareil</h2>
        <div className='flex flex-col gap-4 w-70'>
            {form.fields.map((field)=>
              <SearchOptions
              key={field.key}
                type={field.type}
                optionEndpoint={field.optionEndpoint}
                placeholder={field.placeholder}
                callback={(toChange)=>{setDeviceData({...deviceData, [field.key]:toChange})}}
                />
            )}
        </div>
      </div>
  )
}
