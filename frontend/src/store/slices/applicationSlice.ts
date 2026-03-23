import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Application } from '../../types';

interface ApplicationState {
  applications: Application[];
  selectedApplication: Application | null;
  statusFilter: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  selectedApplication: null,
  statusFilter: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    setSelectedApplication: (state, action: PayloadAction<Application | null>) => {
      state.selectedApplication = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.statusFilter = action.payload;
    },
    clearSelectedApplication: (state) => {
      state.selectedApplication = null;
    },
  },
});

export const {
  setApplications,
  setSelectedApplication,
  setStatusFilter,
  clearSelectedApplication,
} = applicationSlice.actions;
export default applicationSlice.reducer;
