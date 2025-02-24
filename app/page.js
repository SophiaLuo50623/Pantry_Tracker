'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material'
import {collection, query, deleteDoc, doc, getDocs, getDoc, setDoc} from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query (collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push(
        {
          name: doc.id,
          ...doc.data(),
        }
      )
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
        await setDoc(docRef, {quantity: quantity + 1})
      }
      else{
        await setDoc(docRef, {quantity: 1})
      }
      await updateInventory()
    }
    
  


  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity ==1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }


  useEffect(() => {
    updateInventory()}, [])
  
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
  
    <Box width="100vw" 
    height = "100vh" 
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    flexDirection="column"> 

      <Modal open={open} onClose = {handleClose}>
        <Box position="absolute" 
    top="40%" 
    left="40%" 
    transform="translate(-50%,-50%)" 
    width={400} 
    bgcolor="white" 
    border="2px solid #000" 
    boxShadow={24} 
    p={4} 
    display="flex" 
    flexDirection="column" 
    gap={3}
    opacity={0.8}>
          <Typography variant = "h6" >Add item</Typography>
          <Stack
          width="100%"
          direction = "row"
          spacing = {2}>
            <TextField variant = "outlined" fullWdith value={itemName} onChange={(e) => {
              setItemName(e.target.value)
            }}
            ></TextField>
            <Button variant = "outlined" onClick={
              () => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }
            }>Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* <Typography variant="h1">Inventory Management</Typography> */}
      <Button variant = "contained" onClick={() => {handleOpen()}}>
            Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box width="800px" height="100px" bgcolor={"#ADD8E6"} display = "flex" alignItems = "centre" justifyContent={"center"}>
          <Typography variant = 'h2' color = '#333'>Inventory Items</Typography>
          </Box>     
      
      <Stack width = "800px"
      height = "300px"
      spacing={2}
      overflow="auto">{
        inventory.map(({name, quantity}) => (
          <Box key={name} width = "100%" display = "flex" minHeight="150px" alignItems="center" justifyContent="space-between" padding={5} bgColor="#f0f0f0">
            <Typography variant = 'h3' 
            color = "#333" 
            textAlign={"center"}>{name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant = 'h3' 
            color = "#333" 
            textAlign={"center"}>{quantity}
            </Typography>
            <Stack></Stack>
            <Button variant = "contained" onClick = {() => {
              addItem(name)
            }}>
              Add
            </Button>
            <Button variant = "contained" onClick = {() => {
              removeItem(name)
            }}>
              Remove
            </Button>

          </Box>  
        ))}
      
      
      
      </Stack>
      </Box>
    </Box>


  )
   
}
