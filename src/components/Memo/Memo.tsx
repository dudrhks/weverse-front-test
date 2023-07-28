import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { MemoItem, updateMemo } from '@/features/memoSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';

interface Props {
  selected: string;
}

function Memo({ selected }: Props) {
  const [input, setInput] = useState({ title: '', contents: '' });
  const list = useAppSelector((state) => state.memo.list);
  const dispatch = useAppDispatch();

  const selectedMemo = useMemo(() => list?.find((x) => x.id === selected), [list, selected]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { value, id } = e.target;
      console.log();
      // dispatch(updateMemo({ id: selected, text: value, type: id as keyof MemoItem }));
    },
    [dispatch, selected],
  );

  return (
    <Container>
      <p>저장됨: {selectedMemo?.date}</p>
      <div className="title">
        <input placeholder="제목을 입력하세요" id="title" onChange={(e) => onChange(e)} value={selectedMemo?.title} />
      </div>
      <div className="contents">
        <textarea
          placeholder="내용을 입력하세요"
          id="contents"
          maxLength={1000}
          onChange={onChange}
          value={selectedMemo?.contents}
        />
      </div>
    </Container>
  );
}

const Container = styled.section`
  background: #242424;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  > p {
    padding: 8px 0;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    color: #727272;
  }
  > div.title {
    > input {
      width: 100%;
      padding: 12px 32px;
      font-size: 18px;
      font-weight: bold;
      &::placeholder {
        font-weight: 400;
        color: #474747;
      }
    }
  }
  > div.contents {
    flex: 1;
    > textarea {
      width: 100%;
      height: 100%;
      padding: 12px 32px;
      font-size: 16px;
      &::placeholder {
        font-weight: 400;
        color: #474747;
      }
    }
  }
`;

export default Memo;
