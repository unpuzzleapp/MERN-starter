import './App.scss';
import { useRoutes } from 'react-router-dom';
import routes from './routes/Routes';
import Themer from './theme/index';

function App() {
  const routing = useRoutes(routes);
  return <Themer>{routing}</Themer>;
}

export default App;
