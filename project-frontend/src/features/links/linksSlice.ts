import {ILink} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchLinkByUrl, postLink} from "./linksThunk.ts";

interface LinkState {
    item: ILink | null;
    loading: boolean;
}

const initialState: LinkState = {
    item: null,
    loading: false,
};

export const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLinkByUrl.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLinkByUrl.fulfilled, (state, {payload: link}) => {
                state.item = link;
                state.loading = true;
            })
            .addCase(postLink.pending, (state) => {
                state.loading = true;
            }).addCase( postLink.fulfilled, (state, {payload: link}) => {
                state.loading = false;
                state.item = link;
            }).addCase( postLink.rejected, (state) => {
                state.loading = false;
        })

    }
});

export const linksReducer = linksSlice.reducer;
export const selectOneLink = (state: RootState) => state.links.item;
