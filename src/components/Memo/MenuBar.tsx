import { find, reduce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiCheck, BiFontColor, BiSolidColorFill } from 'react-icons/bi';
import { styled } from 'styled-components';

import { useAppSelector, useToggle } from '@/hooks';

interface Props {
  selected: string;
  onChange: (style: string) => void;
  onChangeBgColor: (color: string) => void;
  onFocus: () => void;
}

const fontColors = [
  { name: 'WHITE', color: '#FFFFFF' },
  { name: 'BLACK', color: '#242424' },
  { name: 'RED', color: '#F2380F' },
  { name: 'YELLOW', color: '#F2B705' },
  { name: 'ORANGE', color: '#F28705' },
  { name: 'GREEN', color: '#04bf55' },
  { name: 'BLUE', color: '#0339A6' },
];

export const styleMap = reduce(fontColors, (a, v) => ({ ...a, [v.name]: { color: v.color } }), {});

function MenuBar({ selected, onChange, onChangeBgColor }: Props) {
  const [fontColor, setFontColor] = useState(fontColors[0].name);
  const [bgColor, setBgColor] = useState(fontColors[1].name);
  const [fontColorModal, onFontColorToggle] = useToggle();
  const [bgColorModal, onBgColorToggle] = useToggle();

  const list = useAppSelector((state) => state.memo.list);

  const selectedMemo = useMemo(() => find(list, (x) => x.id === selected), [list, selected]);

  const onChangeFontColor = useCallback(
    (name: string) => {
      setFontColor(name);
      onChange(name);
      onFontColorToggle();
    },
    [onChange, onFontColorToggle],
  );
  const onChangeBg = useCallback(
    (color: string, name: string) => {
      setBgColor(name);
      onChangeBgColor(color);
      onBgColorToggle();
    },
    [onBgColorToggle, onChangeBgColor],
  );

  useEffect(() => {
    setFontColor(fontColors[0].name);
    setBgColor(
      selectedMemo?.bgColor
        ? find(fontColors, (x) => x.color === selectedMemo.bgColor)?.name ?? fontColors[1].name
        : fontColors[1].name,
    );
  }, [selected]);

  return (
    <Container>
      <div>
        <button type="button" onClick={onFontColorToggle}>
          <BiFontColor size="24" />
        </button>
        {fontColorModal && (
          <ul>
            {fontColors.map((item) => (
              <Item key={item.name} color={item.color} onClick={() => onChangeFontColor(item.name)}>
                <div />
                {item.name === fontColor ? <BiCheck size="16" /> : <div />}
                <p />
              </Item>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button type="button" onClick={onBgColorToggle}>
          <BiSolidColorFill size="24" />
        </button>
        {bgColorModal && (
          <ul>
            {fontColors.map((item) => (
              <Item key={item.name} color={item.color} onClick={() => onChangeBg(item.color, item.name)}>
                <div />
                {item.name === bgColor ? <BiCheck size="16" /> : <div />}
                <p />
              </Item>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 20px;
  display: flex;
  gap: 8px;
  background: #2f302f;
  border-left: 1px solid #1c1e1c;
  > div {
    position: relative;
    width: 32px;
    height: 32px;
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
    > ul {
      margin-top: 8px;
      position: absolute;
      padding: 8px 0;
      background: #494c49;
      border-radius: 8px;
      z-index: 33;
    }
  }
`;

const Item = styled.li<{ color?: string }>`
  padding: 8px 32px 8px 0;
  cursor: pointer;
  display: flex;
  gap: 8px;
  font-size: 14px;
  > div {
    width: 16px;
    height: 16px;
  }
  > p {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    background: ${(props) => props.color};
  }
  &:hover {
    background: #565956;
  }
`;

export default MenuBar;
