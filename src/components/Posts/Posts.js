import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import {  Typography, Paper,  } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

import { handleSubmit, currentId, setCurrentId } from '../Form/Form';

const Posts = ({ currentId, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [postData, setPostData] = useState({ username: '', identifier : '', firstname: '', lastname: '' });
    const classes = useStyles();
    const dispatch = useDispatch();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);

        if (user) {

            dispatch(createPost({ ...postData, name: user?.result?.name }));
            
        } else {
          
        }
    };

   
    
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        setData(list);
        setColumns(columns);
    }

    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
            console.log(data)

        };
        reader.readAsBinaryString(file);
    }





    
    return (

        <Paper className={classes.paper}>
             <Paper className={classes.paper}>
                 <Typography variant="h6" align="center">
                    Import CSV FILE
                </Typography>
             </Paper>
           
          <Paper className={classes.paper}>
                <div>

                   
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                        }}



                

                    >drop here</div>

              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                 />
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
                    />
                 </div>
                    </Paper>
                
          </Paper>
       
    );
}

export default Posts;	