import { CartProvider } from "./context/CartContext";
import HomeRoutes from "./route/HomeRoutes";
import DashboardHomeRoute from "./routes/admin/DashboardHomeRoute";

function App() {
  return (
    <>
      <CartProvider>
        <HomeRoutes />
        <DashboardHomeRoute />
      </CartProvider>
      
    </>
  );
}

export default App;





















// import { CartProvider } from "./context/CartContext";
// import HomeRoutes from "./route/HomeRoutes";
// import DashboardHomeRoute from "./routes/admin/DashboardHomeRoute";
// import { Routes, Route, BrowserRouter } from "react-router-dom";


// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <CartProvider>
//           <Routes>
//             <Route path="/*" element={<HomeRoutes />} />
//             <Route path="/admin/*" element={<DashboardHomeRoute />} />



//           </Routes>
//         </CartProvider>
//       </BrowserRouter>

//     </>
//   );
// }

// export default App;