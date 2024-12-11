import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const createSession = createAsyncThunk(
  'groupSession/create',
  async () => {
    const response = await api.post('/group-sessions');
    return response.data;
  }
);

export const joinSession = createAsyncThunk(
  'groupSession/join',
  async (sessionId) => {
    const response = await api.post(`/group-sessions/${sessionId}/join`);
    return response.data;
  }
);

const groupSessionSlice = createSlice({
  name: 'groupSession',
  initialState: {
    sessionId: null,
    participants: [],
    votes: {},
    finalChoice: null,
    loading: false,
    error: null
  },
  reducers: {
    addVote: (state, action) => {
      state.votes[action.payload.userId] = action.payload.restaurantId;
    },
    setFinalChoice: (state, action) => {
      state.finalChoice = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.fulfilled, (state, action) => {
        state.sessionId = action.payload.sessionId;
        state.participants = [action.payload.creator];
      })
      .addCase(joinSession.fulfilled, (state, action) => {
        state.participants = action.payload.participants;
      });
  }
});

export const { addVote, setFinalChoice } = groupSessionSlice.actions;
export default groupSessionSlice.reducer;
