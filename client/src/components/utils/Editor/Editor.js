import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography, Box, Grid, Button, TextField, Tooltip, Avatar } from "@material-ui/core";


const Editor = () => {
    const currentState = (event,editor)=>{
        const data = editor.getData();
        console.log( { data } );
    }
    const PushComment = () => {
        
    }
    const cancelComment = () => {
        
    }

    return (
        <div className="App">
                <CKEditor   
                    editor={ ClassicEditor }
                    data="Comment here !"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => currentState(event,editor)}
                    onBlur={ ( event, editor ) => {currentState(event,editor)}}
                    onFocus={ ( event, editor ) => {currentState(event,editor)}}
                />
                        <Tooltip title='Add Comment' placement="top" arrow >
                            <Button variant="contained" color="primary" onClick={() => PushComment()}>Send</Button>
                        </Tooltip>
                        <Tooltip title='Delete Comment' placement="top" arrow >
                            <Button variant="contained" color="secondary" onClick={() => cancelComment()}>Cancel</Button>
                        </Tooltip>
            </div>
    )
}

export default Editor
