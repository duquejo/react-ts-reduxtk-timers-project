import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../utils/constants';
import { RootState } from '../store/store';

type MessageType = 'info' | 'success' | 'error';

export interface IMessage {
  content: string;
  time: number;
  type?: MessageType;
}

export interface IHudState {
  isModalEnabled: boolean;
  isDebugModeEnabled: boolean;
  latestMessages: {
    visible: boolean;
    messages: Array<IMessage>;
  }
}

const initialState: IHudState = {
  isModalEnabled: true,
  isDebugModeEnabled: true,
  latestMessages: {
    visible: true,
    messages: []
  },
};

export const hudSlice = createSlice({
  name: SLICE_NAMES.HUD,
  initialState,
  reducers: {
    activeModal: (state: IHudState, action: PayloadAction<boolean>) => ({
      ...state,
      isModalEnabled: action.payload
    }),
    activeDebugMode: (state: IHudState, action: PayloadAction<boolean>) => ({
      ...state,
      isDebugModeEnabled: action.payload
    }),
    addMessage: (state: IHudState, action: PayloadAction<IMessage>) => {
      const messages = state.latestMessages.messages;
      if( messages.length > 0 ) {
        const latestContent = (messages[messages.length - 1].content);
        const latestRepeats = latestContent.match(/\d+/);
        const isRepeated = latestContent.includes(action.payload.content);
        if( isRepeated ) {
          state.latestMessages.messages[messages.length - 1].content = `${action.payload.content} (x${latestRepeats ? parseInt(latestRepeats[0])+1 : 2 })`;
          return;
        }
      }
      state.latestMessages.messages.push({
        ...action.payload,
        type: ! action.payload.type ? 'info' : action.payload.type
      });
    },
    clearMessages: (state: IHudState) => {
      state.latestMessages.messages = [];
    },
    toggleMessages: (state: IHudState) => {
      state.latestMessages.visible = ! state.latestMessages.visible;
    },
  }
});

export const { activeModal, activeDebugMode, addMessage, clearMessages, toggleMessages } = hudSlice.actions;

export const selectHud = (state: RootState): IHudState => state.hud;

export default hudSlice.reducer;