import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (thunkAPI) => {
    const [ sportsKindsResponse, userDataResponse ] = await Promise.all([
      axios(process.env.REACT_APP_API_URL + '/sports'),
      axios(process.env.REACT_APP_API_URL + '/users/dkuznetsov'),
    ]);
    console.log('sportsKinds',sportsKindsResponse.data);
    console.log('userData',userDataResponse.data);
    return {
      sportsKinds: sportsKindsResponse.data,
      userData: userDataResponse.data
    };
  }
)

const userData = createSlice({
  name: 'global',
  initialState: {
    userData: {},
    sportsKinds: [],
    dataIsLoaded: false
  },
  reducers: {
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      console.log(action);
      
      state.userData = action.payload.userData;
      state.sportsKinds = action.payload.sportsKinds;
      state.dataIsLoaded = true;
    });
  },
})

export const store = createStore(
  userData.reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

