import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import './App.css';
import { Grid } from '@mui/material';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [multiInputValue, setMultiInputValue] = useState('');
  const [file, setFile] = useState('');
  const [nameFile, setNameFile] = useState('');

  const handleInputChange = async(event) => {
    setInputValue(event.target.value);
  };
  
  const handleFileChange = async(e) => {
    try {
      let file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setFile(file);
      setNameFile(file.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInput = () => {
    setMultiInputValue((prevValue) => prevValue + inputValue + '\n');
    setInputValue('');
  };

  const handleDownload = () => {
    const array = multiInputValue.split('\n').filter((element) => element !== '');
    array.forEach((content, index) => {
      const fileName = `${content}.txt`;
      const blob = new Blob([''], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className='container'>
      <div className='content-container'>
        <Grid>
          <div className='content al-end'>
            <Button
              className='btnUpload'
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {
              nameFile &&
              <div >{nameFile}</div>
            }
          </div>
          <div className='content formInput'>
            <TextField
              className='inputAdd'
              label="Input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button className='buttonAdd' variant="contained" onClick={handleAddInput}>
              Add
            </Button>
          </div>
          <div className='content formDownload'>
            <TextareaAutosize
              className='inputDownload'
              aria-label="Multi-input"
              placeholder="Multi-input"
              value={multiInputValue}
              rowsMin={3}
              style={{ width: '50%' }}
            />
            <Button className='buttonDownload' variant="contained" onClick={handleDownload}>
              Download
            </Button>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default App;
