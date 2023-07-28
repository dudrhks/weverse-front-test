import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MemoItem = { id: string; title: string; contents: string; date: string };

export interface MemoState {
  list: MemoItem[];
}

const initialState: MemoState = {
  list: [
    {
      id: uuidv4(),
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      title: '별 헤는 밤',
      contents:
        '언덕 별 토끼, 있습니다. 잔디가 딴은 밤이 않은 봅니다. 라이너 하늘에는 나는 했던 별에도 걱정도 무덤 별빛이 버리었습니다. 때 덮어 노새, 까닭이요, 계절이 어머니, 별 까닭입니다. 소학교 하나의 봄이 계십니다. 이런 당신은 아무 위에 벌써 때 강아지, 흙으로 별 있습니다. 별을 무덤 까닭이요, 오면 이름자 무성할 까닭입니다. 책상을 별들을 그리고 속의 있습니다. 아무 남은 프랑시스 이국 무성할 있습니다. 파란 애기 덮어 무덤 남은 비둘기, 다 별 봅니다.',
    },
  ],
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    addMemo: (state) => {
      state.list.unshift({
        id: uuidv4(),
        title: '',
        contents: '',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    },
    deleteMemo: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      if (state.list.length > 1) {
        state.list = state.list.filter((x) => x.id !== id);
      }
    },
    updateMemo: (state, action: PayloadAction<{ id: string; text: string; type: keyof MemoItem }>) => {
      const { id, text, type } = action.payload;

      const idx = state.list.findIndex((x) => x.id === id);
      state.list[idx][type] = text;
      state.list[idx].date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
  },
});

export const { addMemo, deleteMemo, updateMemo } = memoSlice.actions;

export default memoSlice.reducer;
