import Main from './components/main.jsx';
import Create from './components/create.jsx';
import Edit from './components/edit.jsx';
import Read from './components/read.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/edit/:Order_id' element={<Edit/>}/>
          <Route path='/read/:Order_id' element={<Read/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
