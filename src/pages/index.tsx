import React, { useContext } from 'react';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';

import RSUForm from '@/components/RSUForm';

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
  return (
    <React.Fragment>
      <RSUForm />
    </React.Fragment>
  );
};

export default Home;
