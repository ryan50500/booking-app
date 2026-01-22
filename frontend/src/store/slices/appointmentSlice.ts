import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
  selectedDoctor: null | {
    id: string;
    name: string;
    specialization: string;
  };
  selectedDate: string | null;
  selectedTimeSlot: string | null;
}

const initialState: AppointmentState = {
  selectedDoctor: null,
  selectedDate: null,
  selectedTimeSlot: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setSelectedDoctor: (state, action: PayloadAction<any>) => {
      state.selectedDoctor = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTimeSlot: (state, action: PayloadAction<string>) => {
      state.selectedTimeSlot = action.payload;
    },
    clearAppointment: (state) => {
      state.selectedDoctor = null;
      state.selectedDate = null;
      state.selectedTimeSlot = null;
    },
  },
});

export const { setSelectedDoctor, setSelectedDate, setSelectedTimeSlot, clearAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
