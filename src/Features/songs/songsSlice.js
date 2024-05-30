import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LikedSongs: [],
    historySong: [
        {
            "id": "8N_6I8Gn",
            "name": "Harleys In Hawaii",
            "type": "song",
            "year": "2019",
            "releaseDate": "2019-10-16",
            "duration": 186,
            "label": "Capitol Records",
            "explicitContent": false,
            "playCount": 33025410,
            "language": "english",
            "url": "https://www.jiosaavn.com/song/harleys-in-hawaii/SCY0Bz0IcF0",
            "copyright": "℗ 2019 Capitol Records, LLC",
            "album": {
                "id": "17614993",
                "name": "Harleys In Hawaii",
                "url": "https://www.jiosaavn.com/album/harleys-in-hawaii/aQQozrQ7s9s_"
            },
            "artists": {
                "primary": [
                    {
                        "id": "565740",
                        "name": "Katy Perry",
                        "role": "primary_artists",
                        "image": [
                            {
                                "quality": "50x50",
                                "url": "https://c.saavncdn.com/artists/Katy_Perry_004_20200616105931_50x50.jpg"
                            },
                            {
                                "quality": "150x150",
                                "url": "https://c.saavncdn.com/artists/Katy_Perry_004_20200616105931_150x150.jpg"
                            },
                            {
                                "quality": "500x500",
                                "url": "https://c.saavncdn.com/artists/Katy_Perry_004_20200616105931_500x500.jpg"
                            }
                        ],
                        "type": "artist",
                        "url": "https://www.jiosaavn.com/artist/katy-perry-songs/Q8k4MniH10k_"
                    }
                ],
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/289/Harleys-In-Hawaii-English-2019-20191015230756-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/289/Harleys-In-Hawaii-English-2019-20191015230756-150x150.jpg"
                },
                {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/289/Harleys-In-Hawaii-English-2019-20191015230756-500x500.jpg"
                }
            ],
            "downloadUrl": [
                {
                    "quality": "12kbps",
                    "url": "https://aac.saavncdn.com/289/a321dc07022639f00ddacabffcb38220_12.mp4"
                },
                {
                    "quality": "48kbps",
                    "url": "https://aac.saavncdn.com/289/a321dc07022639f00ddacabffcb38220_48.mp4"
                },
                {
                    "quality": "96kbps",
                    "url": "https://aac.saavncdn.com/289/a321dc07022639f00ddacabffcb38220_96.mp4"
                },
                {
                    "quality": "160kbps",
                    "url": "https://aac.saavncdn.com/289/a321dc07022639f00ddacabffcb38220_160.mp4"
                },
                {
                    "quality": "320kbps",
                    "url": "https://aac.saavncdn.com/289/a321dc07022639f00ddacabffcb38220_320.mp4"
                }
            ]
        }
    ],
};
export const songsSlice = createSlice({
    name: 'LikedSong',
    initialState,
    reducers: {
        addSong: (state, action) => {
            const songExists = state.LikedSongs.some(song => song.id === action.payload);
            if (!songExists) {
                state.LikedSongs.push(action.payload);
            }
        },
        removeSong: (state, action) => {
            state.LikedSongs = state.LikedSongs.filter(song => song.id !== action.payload);
        },
        addToHistory: (state, action) => {
            const songIndex = state.historySong.findIndex(song => song.id === action.payload.id);

            // If the song is already in the history, remove it
            if (songIndex !== -1) {
                state.historySong.splice(songIndex, 1);
            }

            // Add the song to the front of the history
            state.historySong.unshift(action.payload);

            // Ensure the history does not exceed 30 songs
            if (state.historySong.length > 30) {
                state.historySong.pop();
            }


        },
    },
});

export const { addSong, removeSong, addToHistory } = songsSlice.actions;
export default songsSlice.reducer;
