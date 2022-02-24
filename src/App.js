import './App.css';
import { Page } from './controls/Page';
import data from './data/thoskite-2-2022.json';

function App() {
  return (
    <div className="App">
      <Page data={data.posts}/>
    </div>
  );
}

export default App;
