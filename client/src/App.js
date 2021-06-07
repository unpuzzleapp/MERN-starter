import React, { useState } from 'react';
import axios from 'axios';
import { useRoutes } from 'react-router-dom';
import routes from './routes/Routes';
import Themer from './theme/index';
import Footer from './common/component/Footer';
import requestInterceptor from './utils/axiosInterceptor';
import { DEFAULT_AXIOS_URL } from './constant/env';
import './App.css';

axios.defaults.baseURL = DEFAULT_AXIOS_URL;
// axios.defaults.withCredentials = true;
function App() {
  // initialize the axios
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  requestInterceptor();
  const routing = useRoutes(routes);
  return (
    <Themer id="theme-selector">
      {routing}
      <Footer
        value={value}
        setValue={setValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Themer>
  );
}

export default App;
