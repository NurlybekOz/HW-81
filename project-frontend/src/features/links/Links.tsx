import {LinkWithoutId} from "../../types";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneLink} from "./linksSlice.ts";
import { toast } from "react-toastify";
import {fetchLinkByUrl, postLink} from "./linksThunk.ts";
import {Button, Grid, TextField, Typography} from "@mui/material";


const Links = () => {
    const [form, setForm] = useState<LinkWithoutId>({
        url: ''
    })
    const link = useAppSelector(selectOneLink)
    const dispatch = useAppDispatch()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.url.trim()) {
            toast.error('URL cannot be empty')
            return;
        }
        try {
            const newLink = await dispatch(postLink(form)).unwrap();
            await dispatch(fetchLinkByUrl(newLink.shortUrl));
        } catch (e) {
            console.error(e);
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }


    return (
        <>
        <form onSubmit={onSubmit} style={{ width: "25%", margin: "0 auto"}}>
            <Grid container spacing={2} direction="column">
                <Grid size={12} >
                    <TextField
                        style={{width:'100%'}}
                        id='url'
                        label="Enter URL here"
                        name="url"
                        value={form.url}
                        type='url'
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={12}>
                    <Button style={{width:'100%'}} type="submit" color="primary" variant="contained">
                        Shorten!
                    </Button>
                </Grid>
            </Grid>
        </form>

        {link ? <Grid sx={{display: "flex", flexDirection: "column", width: "25%", margin: "10px auto"}}>
            <Typography style={{fontWeight: 'bold'}}>Your link now looks like this</Typography>
            <Typography> <a href={link.url} target="_blank">
                {link.shortCodeUrl}
            </a></Typography>
        </Grid> : null}
        </>
    );
};

export default Links;