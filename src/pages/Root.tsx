import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import List from '@/components/List/List';
import { Memo } from '@/components/Memo';
import { useAppSelector } from '@/hooks';

function Root() {
  const list = useAppSelector((list) => list.memo.list);
  const [selected, setSelected] = useState(list[0].id);

  const onSelected = useCallback((id: string) => {
    setSelected(id);
  }, []);

  useEffect(() => {
    setSelected(list[0].id);
  }, [list.length]);

  return (
    <Main>
      <List selected={selected} onSelected={onSelected} />
      <Memo selected={selected} />
    </Main>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

export default Root;
