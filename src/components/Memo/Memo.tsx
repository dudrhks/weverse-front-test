import 'draft-js/dist/Draft.css';

import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import { debounce, find } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { updateMemo } from '@/features/memoSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { decrypt, encrypt } from '@/utils';

import MenuBar, { styleMap } from './MenuBar';

interface Props {
  selected: string;
}

function Memo({ selected }: Props) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState(() => EditorState.createEmpty());
  const [bgColor, setBgColor] = useState('#242424');
  const editor = useRef<Editor>(null);

  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.memo.list);

  const selectedMemo = useMemo(() => find(list, (x) => x.id === selected), [list, selected]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  }, []);
  const onChangeContents = useCallback((e: EditorState) => {
    const totalLength = e.getCurrentContent().getPlainText().length;
    if (totalLength > 1000) return;
    setContents(e);
  }, []);
  const onChangeStyle = useCallback(
    (style: string) => {
      setContents(RichUtils.toggleInlineStyle(contents, style));
    },
    [contents],
  );
  const onChangeBgColor = useCallback((color: string) => {
    setBgColor(color);
  }, []);
  const handleBeforeInput = useCallback(
    (chars: string) => {
      const totalLength = contents.getCurrentContent().getPlainText().length + chars.length;
      return totalLength > 1000 ? 'handled' : 'not-handled';
    },
    [contents],
  );
  const onFocus = useCallback(() => {
    editor.current?.focus();
  }, []);

  useEffect(
    debounce(() => {
      if (!title && !contents) return;
      const contentState = contents.getCurrentContent();
      const raw = convertToRaw(contentState);
      dispatch(updateMemo({ id: selected, title: encrypt(title), bgColor, contents: encrypt(JSON.stringify(raw)) }));
    }, 2000),
    [title, contents, bgColor],
  );

  useEffect(() => {
    const raw = convertFromRaw(JSON.parse(decrypt(selectedMemo?.contents ?? '')));
    const contentState = EditorState.createWithContent(raw);
    setTitle(decrypt(selectedMemo?.title ?? ''));
    setContents(contentState);
    setBgColor(selectedMemo?.bgColor ?? '#242424');
  }, [selected]);

  return (
    <Container color={bgColor}>
      <MenuBar selected={selected} onChange={onChangeStyle} onChangeBgColor={onChangeBgColor} onFocus={onFocus} />

      <p>저장됨: {selectedMemo?.date}</p>
      <div className="title">
        <input placeholder="제목을 입력하세요" id="title" onChange={onChangeTitle} value={title} />
      </div>
      <div className="contents">
        <Editor
          ref={editor}
          customStyleMap={styleMap}
          editorState={contents}
          onChange={onChangeContents}
          handleBeforeInput={handleBeforeInput}
          placeholder="내용을 입력하세요"
        />
      </div>
    </Container>
  );
}

const Container = styled.section<{ color?: string }>`
  background: ${({ color }) => color ?? '#242424'};
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
    padding: 12px 32px;
    > div {
      font-size: 16px;
    }
    .public-DraftEditorPlaceholder-inner {
      font-weight: 400;
      color: #474747;
    }
  }
`;

export default Memo;
