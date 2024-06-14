// import React from "react";
// import Sidebar from "./components/Sidebar";
// import Newsfeed from "./pages/Newsfeed";
// import Home from './pages/Home';
// import Addride from './pages/Addride';
// import Currentride from './pages/Currentride';
// import './App.css';
// import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="dashboard">
//         <Sidebar />
//         <div className="content">
         
//           <Routes>
          
//           <Route path="/" element={<Navigate to="/newsfeed" replace />} />
//             <Route path="/newsfeed" element={<Newsfeed />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/addride" element={<Addride />} />
//             <Route path="/currentride" element={<Currentride />} />
//           </Routes>
//         </div>
//       </div>
      
//     </BrowserRouter>
    
//   );
// }

// export default App;


import React from "react";
import Sidebar from "./components/Sidebar";
import Newsfeed from "./pages/Newsfeed";
import Home from './pages/Home';
import Addride from './pages/Addride';
import Currentride from './pages/Currentride';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Readmore from './pages/Readmore'; // Import Readmore component

const MainLayout = ({ children }) => (
  <div className="dashboard">
    <Sidebar />
    <div className="content">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newsfeed" element={<MainLayout><Newsfeed /></MainLayout>} />
        <Route path="/addride" element={<MainLayout><Addride /></MainLayout>} />
        <Route path="/currentride" element={<MainLayout><Currentride /></MainLayout>} />
        <Route path="/readmore/:id" element={<Readmore />} /> {/* Route for Readmore */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
