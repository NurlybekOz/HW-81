import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILink, LinkWithoutId} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchLinkByUrl = createAsyncThunk<ILink, string>(
    'links/fetchLinkByUrl',
    async (shortUrl) => {
        const response = await axiosApi<ILink>(`/links/${shortUrl}`)
        return response.data || null;
    }
)
export const postLink = createAsyncThunk<ILink, LinkWithoutId>(
    'links/postLink',
    async (linkToPost) => {
        const response = await axiosApi.post('/links', linkToPost);
        return response.data;
    }
);