import logo from './logo.svg';
import './App.css';
import Header from './Components/Layouts/Header';
import CreateCategory from './Components/Admin/Category/Create';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateCategory from './Components/Admin/Category/Update';
import CategoryList from './Components/Admin/Category/Category';
import Sidebar from './Components/Admin/Sidebar';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/category/create" element={<CreateCategory />} end />
          <Route path="/category/update/:id" element={<UpdateCategory />} end />
          <Route path="/category/list" element={<CategoryList />} end />


          {/* for admin */}
          <Route path="/sidebar" element={<Sidebar />} end />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
