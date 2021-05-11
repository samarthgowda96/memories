import React,{useState,useEffect} from 'react';
import useStyles from './Styles'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch,useSelector} from 'react-redux'

import {createPost,updatePost} from '../../actions/posts'

const Form=({currentId,setCurrentId}) => {
    const post= useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);
    const classes = useStyles();
    const [postData,setPostData] = useState({
        creator:'', title:'', message:'', tags:"", selectedFile:'',

    })
    useEffect(()=>{
        if(post){
            setPostData(post)
        }

    },[post])
    const dispatch = useDispatch();
    const handleSubmit =(e) => {
        e.preventDefault()

        if(currentId){
            dispatch(updatePost(currentId,postData))
        }else{
            dispatch(createPost(postData))

        }
    }

    const clear=()=>{
        console.log("working on this later")
    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                {
                post?
                    <Typography className={classes.heading} variant='h6'>Do you wish to edit your memory?</Typography>
                    :
                    <Typography className={classes.heading} variant='h6'>Creating a Memory!!</Typography>
                }
                <TextField 
                name="creator" 
                variant="outlined" 
                label='creator'
                fullWidth
                value={postData.creator}
                onChange={(e) =>setPostData({...postData,creator:e.target.value})}
                />
                <TextField 
                name="title" 
                variant="outlined" 
                label='title'
                fullWidth
                value={postData.title }
                onChange={(e) =>setPostData({...postData,title:e.target.value})}
                />
                <TextField 
                name="message" 
                variant="outlined" 
                label='message'
                fullWidth
                value={postData.message}
                onChange={(e) =>setPostData({...postData,message:e.target.value})}
                />
                <TextField 
                name="tags" 
                variant="outlined" 
                label='tags'
                fullWidth
                value={postData.tags}
                onChange={(e) =>setPostData({...postData,tags:e.target.value})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                    type="fi le"
                    multiple={false}
                    onDone={({base64}) =>setPostData({...postData,selectedFile:base64})}
                    />
                <Button 
                className={classes.buttonSubmit} 
                variant='container'
            
                size='large'
                type='submit'
                fullWidth>
                        Submit
                </Button>
                <Button  
                variant='contained'
                color='secondary'
                size='small'
                onClick={clear}
                fullWidth>
                        Clear
                </Button>
                </div>

            </form>

        </Paper>
    )
}

export default Form;