import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { User } from '../interfaces';

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
    userData: <User>{},
    sportsKinds: [],
    dataIsLoaded: false
  },
  reducers: {
    addUserGroup(state,action) {
      state.userData.groups.push(action.payload);
    },
    addUserEvent(state,action) {
      state.userData.events.push(action.payload);
    }
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

export const { addUserGroup, addUserEvent } = userData.actions;

console.log(store);

