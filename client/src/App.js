import './App.scss';
import Routes from './routes/Routes';
import Themer from './theme/index';

function App() {
  return (
    <Themer>
      <Routes />
    </Themer>
  );
}

export default App;
