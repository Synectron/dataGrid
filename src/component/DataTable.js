import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import clsx from 'clsx'


const columns = [
  { field: 'id', headerName: 'S.No' },
  { field: 'fault_source', headerName: 'Fm_source', width: 130 },
  { field: 'fault_text', headerName: 'Fault_text', width: 130 },
  { field: 'affected_objects', headerName: 'Affected_objects', width: 130 },
  { field: 'event_time', headerName: 'Event_time', width: 130 },
  { field: 'fault_id', headerName: 'Fault_id',width: 130 },
  { field: 'fault_severity', headerName: 'Fault_severity', width: 130,
            cellClassName: (params) =>
            clsx('super-app', {
                minor: params.row.fault_severity === 'MINOR',
                major: params.row.fault_severity ==='MAJOR',
                critical: params.row.fault_severity ==='CRITICAL',
            }),
    },
  { field: 'is_cleared', headerName: 'Is_cleared', width: 130 },
]
const dataSet =[{"affected_objects":[{"name":"fan"}],"event_time":"2020_11_25T10:00:00+05:30","fault_id":3,"fault_severity":"MINOR","fault_source":"Module","fault_text":"Ambient temperature violation","id":1,"is_cleared":true},
{"affected_objects":[{"name":"Tx_array"},{"name":"Antenna line"}],"event_time":"2020_11_25T12:00:00+06:30","fault_id":27,"fault_severity":"MAJOR","fault_source":"Tx_array","fault_text":"Power amplifier faulty","id":2,"is_cleared":false},
{"affected_objects":[{"name":"Power module"},{"name":"CPU"},{"name":"Battery"}],"event_time":"2020_11_25T12:00:00+07:30","fault_id":33,"fault_severity":"CRITICAL","fault_source":"Module","fault_text":"Dying Gasp(power failure)","id":3,"is_cleared":true}]

const DataTable = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setTableData(parseData(dataSet)))

  }, [])

  const parseData = (data) =>{
    let value =[]
  const finalarry =[]
   data.forEach(element => {
    element.affected_objects.forEach (val =>{
      console.log("push",val);
      value.push(val.name)
    });
    console.log("value",value);
    element.affected_objects=value;
    finalarry.push(element)
    
  });
  console.log(finalarry);
    return finalarry;
  }

  console.log(tableData)

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
      />
    </div>
  )
}

export default DataTable
