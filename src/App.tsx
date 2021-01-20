import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import './App.scss';

interface LocationAllow {
  answer: boolean;
}

const App: React.FC = () => {
  const [location, setLocation] = useState<LocationAllow>({answer: false});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({answer: true})
    })
  }, [])

  return (
    <Fragment>
      <h3>O clima em </h3>
    </Fragment>
  );
}

export default App;
