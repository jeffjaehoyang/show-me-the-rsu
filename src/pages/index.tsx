import React, { useContext } from 'react';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';
import useSWR from 'swr';

import RSUDetail from '@/components/RSUDetail';
import RSUForm from '@/components/RSUForm';

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
  const { shouldShowForm } = useContext(GlobalStateContext);

  return (
    <React.Fragment>
      {shouldShowForm ? <RSUForm /> : <RSUDetail />}
    </React.Fragment>
  );
};

export default Home;
