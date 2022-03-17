import React, { useState, useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Box, TextField } from "@mui/material";
import { FormGroup } from '@mui/material';


import { UsersContext } from '../App';



const AddUser = (props) => {
    const {users, setUsers} = useContext(UsersContext);

    const { open, handler, stateID, setId} = props
    const [newUserDetails, setNewUserDetails] = useState({})

    const handleClose = () => {
        handler(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'address') {
            setNewUserDetails((current) => ({ ...current, [name]: {"city" : value} }));              
            console.log(newUserDetails);
        }
        else{
            setNewUserDetails((current) => ({ ...current, [name]: value }));
        }

    };

    const submitData = () => {
        setNewUserDetails(newUserDetails.id=stateID);
        const newId = stateID
        setId(newId + 1 )
        const ref = [...users]
        ref.push(newUserDetails)
        setUsers(ref)
        console.log(ref);
        handler(false)
    }




    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {/* <div>
                        {(newUserDetails.address)? ('newUserDetails.address.street') : ''}
                    </div> */}
                    <div>
                        <TextField
                            required
                            id="filled-required"
                            label="Name"
                            name="name"
                            defaultValue={newUserDetails.name}
                            type="text"
                            variant="filled"
                            onChange={handleChange}
                        />
                        <TextField
                            id="filled-required-email"
                            required
                            name="email"
                            defaultValue={newUserDetails.email}
                            label="Email"
                            type="email"
                            variant="filled"
                            onChange={handleChange}

                        />
                        <TextField
                            id="filled-required-phone"
                            required
                            name="phone"
                            defaultValue={newUserDetails.phone}
                            label="Phone"
                            type="text"
                            variant="filled"
                            onChange={handleChange}

                        />
                        <TextField
                            id="filled-required-address"
                            required
                            name="address"
                            defaultValue={newUserDetails.address}
                            label="Address"
                            type="text"
                            variant="filled"
                            onChange={handleChange}

                        />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button autoFocus onClick={submitData}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUser