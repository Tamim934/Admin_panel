
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
// import { Files } from '/src/api/Files'
import { FileToBase64 }from '/src/utils/FileToBase64.js'
import { singleFile } from '../../api/Files';
const SubCategories = () => {
  const categories = "http://localhost:3000/api/subCategories"

  const [Brands,setBrands]=useState([])
  const [open, setOpen] = useState(false)
  const [newBrand, setNewBrand] = useState({name: '', img: ''})
  const [imgFile, setImgFile] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


const Files = async function (formData) {
  const response = await fetch(`http://localhost:3000/uploads`, {
    method: "POST",
    body: formData,
  });
  

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
};




  function getToken() {
    return localStorage.getItem("access_token");
  }
  const token = getToken();
  
  async function getBrands(){
        try {
            const { data } = await axios.get(categories, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            setBrands(data)
        } catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{
getBrands()
},[])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    setNewBrand({...newBrand, [e.target.name]: e.target.value})
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    setImgFile(file)
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('file', imgFile)
      const fileData = await singleFile(formData)
      const { data } = await axios.post(categories, {...newBrand, img: fileData.img}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setBrands([...Brands, data])
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  let token2 = localStorage.getItem("access_token");
  console.log(token2)
  async function deleteBrand(id){
    try {
      const {data}=await axios.delete(`${categories}/${id}` ,{
        headers: {
          Authorization: `Bearer ${token2}` 
        }
      });
      console.log(data)
      getBrands()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
  <div className='mt-[20px]'>
  <Typography variant="h3" component="h2" gutterBottom style={{ color: '#3f51b5', textAlign: 'center' }}>
    🔍 Dive Deeper into Our Subcategories 🔍
  </Typography>
  <Typography variant="body1" gutterBottom style={{ textAlign: 'center' }}>
    Welcome to our subcategories page, your guide to the finer details of our product range. Here, you can explore specific areas within each category, making it easier to find exactly what you're looking for. Happy exploring!
  </Typography>
</div>

      <Fab color="primary" aria-label="add" onClick={handleOpen} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <AddIcon />
      </Fab>
      <div className='mt-[20px]'>
      <TextField
  label="Search SubCategories"
  variant="outlined"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a SubCatagories</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="SubCategories"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <input
            type="file"
            name="img"
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <div className='mt-[20px]'>
      <Grid container spacing={3}>
      {Brands.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase())).map((brand) => (
          <Grid item xs={12} sm={6} md={3} key={brand.id}>
            <Card style={{ height: '350px', width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: '15px', boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)' }}>
              <CardMedia
                component="img"
                style={{ height: '150px', objectFit: 'contain', marginBottom: '15px' }}
                image={`http://localhost:3000/${brand.img}`}
                alt={brand.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                  {brand.name}
                </Typography>
              </CardContent>
              <button 
    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center ml-[0px]' 
    onClick={() => {deleteBrand(brand.id)}}
>
    Delete
</button>
            </Card>
          </Grid>
        ))}
      </Grid></div>
    </div>
  )
}



export default SubCategories