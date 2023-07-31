import React, { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { styled } from 'styled-components';

import { addMemo, deleteMemo, dragMemo, Memo } from '@/features/memoSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { decrypt } from '@/utils';

interface Props {
  selected: string;
  onSelected: (id: string) => void;
}

function MemoItem({ memo, index, selected, onSelected }: { memo: Memo; index: number } & Props) {
  return (
    <Draggable draggableId={memo.id} index={index}>
      {(provided) => (
        <Item
          ref={provided.innerRef}
          onClick={() => onSelected(memo.id)}
          selected={selected === memo.id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{decrypt(memo.title) ? decrypt(memo.title) : '새로운 메모'}</p>
          <p>
            <span>{memo.date}</span>
          </p>
        </Item>
      )}
    </Draggable>
  );
}

const MemoList = React.memo(function MemoList(props: Props) {
  const list = useAppSelector((state) => state.memo.list);
  return (
    <>
      {list.map((item, index) => (
        <MemoItem memo={item} index={index} key={item.id} {...props} />
      ))}
    </>
  );
});

function List({ selected, onSelected }: Props) {
  const dispatch = useAppDispatch();

  const onAddMemo = useCallback(() => dispatch(addMemo()), [dispatch]);
  const onDeleteMemo = useCallback(() => dispatch(deleteMemo({ id: selected })), [dispatch, selected]);
  const onDragEnd = useCallback(
    (result: DropResult) => {
      dispatch(dragMemo({ result }));
    },
    [dispatch],
  );

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="memos">
          {(provided) => (
            <ul className="memoList" ref={provided.innerRef} {...provided.droppableProps}>
              <MemoList selected={selected} onSelected={onSelected} />
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

const Container = styled.div`
  background: #1c1e1c;
  height: 100vh;
  overflow-x: hidden;
  > div.list-menu {
    padding: 12px 20px;
    display: flex;
    justify-content: end;
    gap: 28px;
    background: #2f302f;
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
  .memoList {
    padding: 12px;
  }
`;

const Item = styled.li<{ selected?: boolean }>`
  padding: 20px 16px 0;
  background: ${(props) => (props.selected ? '#f2bc1a7c' : '#1c1e1c')};
  border-radius: ${(props) => (props.selected ? '8px' : '0')};
  box-sizing: border-box;
  width: 100%;
  &:hover {
    background: #494c498e;
    border-radius: 8px;
  }
  > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > p:first-child {
    font-size: 13px;
    font-weight: bold;
    padding: 0 4px;
  }
  > p:last-child {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    font-size: 12px;
    padding: 0 4px 20px;
    border-bottom: 1px solid #494c498e;
  }
`;

export default List;
