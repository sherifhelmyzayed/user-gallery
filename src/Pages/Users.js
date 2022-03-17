import { useContext, useState } from 'react'
import { Button, Grid, Typography, IconButton } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { pink } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import DeleteIcon from '@mui/icons-material/Delete';

import { UsersContext } from '../App';


import { UserNewContext } from '../modules/UserModule';
import AddUser from '../Components/AddUser';


const Users = () => {
    const [alertOpen, setAlertOpen] = useState(false)
    const [delUser, SetDelUser] = useState(null)
    const [userDialog, setNewUser] = useState(false);
    const {users, setUsers} = useContext(UsersContext);
    const [id, setId] = useState(12);



    const handleClose = ()=>{
        setAlertOpen(false)
    }

    const openHandler = (id)=> {
        SetDelUser(id)
        setAlertOpen(true)
    }

    const deleteHandler = (id) => {
        handleClose();
        delUserfun();
    }

    const delUserfun = ()=>{
        let arr = users;
        let filtered = arr.filter(function(el) { return el.id !== delUser; });
        setUsers(filtered)
      }

      const addNewUser = ()=>{
        setNewUser(true)
      }

    return (
        <Grid
            container
        >
            <Grid item={true} xs={6} sx={{ backgroundColor: 'primary.main' }} paddingY={2}>
                <Typography variant="h5" component="h2" display={'inline'} paddingLeft={5}>
                    Users
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{
                backgroundColor: 'primary.main',
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
            }} paddingY={2} paddingRight={5}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button variant="contained" color="success" marginRight={5} onClick={addNewUser}>Add user</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Number</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users ? (
                            users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <IconButton key={user.id} onClick={()=>{openHandler(user.id)}}>
                                            <DeleteIcon size="small" sx={{ color: pink[500] }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.phone}</TableCell>
                                    <TableCell align="right">{user.address.city}</TableCell>
                                    
                                    <Dialog
                                        open={alertOpen}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Use Google's location service?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to delete this user?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Disagree</Button>
                                            <Button autoFocus onClick={deleteHandler}>
                                                Agree
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </TableRow>
                            ))
                        ) : ''}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddUser open={userDialog} handler={setNewUser} stateID={id} setId={setId} />
        </Grid>
    )
}

export default Users