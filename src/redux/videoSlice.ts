import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VideoWatching {
    episodeId?: number | string;
    played: number;
    playedSeconds: number;
    loadedSeconds: number;
    durationDefault?: number;
}

export const videoWatchingSlice = createSlice({
    name: 'videoWatching',
    initialState: {
        episodeId: 0,
        played: 0,
        playedSeconds: 0,
        durationDefault: 0,
        loadedSeconds: 0,
    },
    reducers: {
        setDataVideoWatching: (state, action) => {
            state.episodeId = action.payload.episodeId;
            state.played = action.payload.played;
            state.playedSeconds = action.payload.playedSeconds;
            state.loadedSeconds = action.payload.loadedSeconds;
        },
        setDurationDefault: (state, action) => {
            state.durationDefault = action.payload;
        },
        setEpisodeId: (state, action) => {
            state.episodeId = action.payload;
        },
    },
});

export const { setDataVideoWatching, setDurationDefault, setEpisodeId } =
    videoWatchingSlice.actions;
export default videoWatchingSlice.reducer;
