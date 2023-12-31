import dayjs from 'dayjs';
import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { encrypt } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Memo {
  id: string;
  title: string;
  contents: string;
  bgColor: string;
  date: string;
}
export interface MemoState {
  list: Memo[];
}

const contents = {
  blocks: [
    {
      key: '8hqu5',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const initialState: MemoState = {
  list: [
    {
      id: uuidv4(),
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      title: encrypt(''),
      bgColor: '#242424',
      contents: encrypt(JSON.stringify(contents)),
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
        title: encrypt(''),
        contents: encrypt(JSON.stringify(contents)),
        bgColor: '#242424',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    },
    deleteMemo: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      if (state.list.length <= 1) {
        alert('메모는 최소 1개 이상이어야 합니다.');
        return;
      }
      state.list = state.list.filter((x) => x.id !== id);
    },
    updateMemo: (state, action: PayloadAction<{ id: string; title: string; bgColor: string; contents: string }>) => {
      const { id, title, contents, bgColor } = action.payload;

      const idx = state.list.findIndex((x) => x.id === id);
      state.list[idx].title = title;
      state.list[idx].contents = contents;
      state.list[idx].bgColor = bgColor;
      state.list[idx].date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    dragMemo: (state, action: PayloadAction<{ result: DropResult }>) => {
      const { result } = action.payload;

      if (!result.destination) return;
      const memosCopy = [...state.list];
      const [reorderedItem] = memosCopy.splice(result.source.index, 1);
      memosCopy.splice(result.destination.index, 0, reorderedItem);

      state.list = memosCopy;
    },
  },
});

export const { addMemo, deleteMemo, updateMemo, dragMemo } = memoSlice.actions;

export default memoSlice.reducer;
