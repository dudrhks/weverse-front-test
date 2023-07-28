import { useCallback } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { styled } from 'styled-components';

import { addMemo, deleteMemo } from '@/features/memoSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';

interface Props {
  selected: string;
  onSelected: (id: string) => void;
}

function List({ selected, onSelected }: Props) {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.memo.list);

  const onAddMemo = useCallback(() => dispatch(addMemo()), [dispatch]);
  const onDeleteMemo = useCallback(() => dispatch(deleteMemo({ id: selected })), [dispatch, selected]);

  return (
    <Container>
      <div className="list-menu">
        <button type="button" onClick={onAddMemo}>
          <BiEdit size="24" />
        </button>
        <button type="button" onClick={onDeleteMemo}>
          <BiTrash size="24" />
        </button>
      </div>
      <ul>
        {list?.map((item) => (
          <Item key={item.id} onClick={() => onSelected(item.id)} selected={selected === item.id}>
            <p>{item.title ? item.title : '새로운 메모'}</p>
            <p>{item.date}</p>
          </Item>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  background: #1c1e1c;
  height: 100vh;
  > div.list-menu {
    padding: 12px 20px;
    display: flex;
    justify-content: end;
    gap: 28px;
    background: #242624;
    > button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background: #494c4981;
      }
    }
  }
  > ul {
    padding: 12px;
  }
`;

const Item = styled.li<{ selected?: boolean }>`
  padding: 20px 16px 0;
  background: ${(props) => (props.selected ? '#f2bc1a7c' : '#1c1e1c')};
  border-radius: ${(props) => (props.selected ? '8px' : '0')};
  box-sizing: border-box;
  &:hover {
    background: #494c498e;
    border-radius: 8px;
  }
  > p:first-child {
    font-size: 13px;
    font-weight: bold;
    padding: 0 4px;
  }
  > p:last-child {
    margin-top: 4px;
    font-size: 12px;
    padding: 0 4px 20px;
    border-bottom: 1px solid #494c498e;
  }
`;

export default List;
