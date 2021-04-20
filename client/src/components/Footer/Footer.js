import React,{useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {
    BottomNavigation,
    BottomNavigationAction, 
    Typography
} from "@material-ui/core"
import CallIcon from '@material-ui/icons/Call';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles=makeStyles(theme=>({
    root:{
        '& .MuiBottomNavigationAction-root':{
            minWidth:0,
            maxWidth:250,
            borderRadius:'3px'
        },
        '& .MuiSvgIcon-root':{
            paddingTop:'0.5rem',
            fill:'#fff',
            fontSize:'1.5rem',
            '&:hover':{
                fill:'#61dafb',                
            }
        }
    }
}));

const Footer = () => {
    const classes = useStyles();
    const [value, setValue] = useState('recents');
    const makeContact = (event, newValue) => {
        const callNode = document.getElementById('call');
        const buttonEl = document.createElement("a");
        switch(newValue){
            case 0 : {
                buttonEl.href = 'tel:+91-7024019995';
                callNode.appendChild(buttonEl);
                buttonEl.click();
                break;
            }
            case 1 :{
                buttonEl.href = 'https://wa.me/917024019995/?text=urlencodedtext';
                callNode.appendChild(buttonEl);
                buttonEl.click();
                break;
            }
            default:{}  
        }
        
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch(newValue){
            case 0 : {
                window.open('https://www.facebook.com/nadim.khan.5811/');
                break;
            }
            case 1 :{
                window.open('https://twitter.com/NadeemK64992940')
                break;
            }
            case 2 :{
                window.open('https://www.instagram.com/iam_noddy/')
                break;
            }
            case 3 :{
                window.open('https://github.com/nadim-khan')
                break;
            }
            case 4 :{
                window.open('https://in.linkedin.com/in/nadeemkhan5811')
                break;
            }
            default:{}  
        }

    };
    return (
        <>
        <BottomNavigation id="call" value={value} onChange={makeContact} className={classes.root} width="auto" style={{background:'#0827c6'}}>
            <BottomNavigationAction label="Call" style={{padding:0,background:'#01e675'}} icon={<CallIcon/>}/>
            <BottomNavigationAction label="Whatsapp" style={{padding:0 ,background:'#1ebea5' }} icon={<WhatsAppIcon/>}/>
        </BottomNavigation>
        <Typography align='center' style={{background:'#0827c6',color:'#fff',height:'3rem',lineHeight:'3rem'}}>
            Developer - Nadeem Khan (P7112670)
        </Typography>
        <Typography align='center' style={{background:'#0827c6',color:'#fff',height:'3rem',lineHeight:'3rem'}}>
            Ness Digital engineering (BTIC)
        </Typography>
        </>
    )
}

export default Footer
