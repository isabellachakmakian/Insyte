import './App.css'; // Import App styling 
import SearchPage from './pages/search/SearchPage.jsx';
import ReportPage from './pages/report/ReportPage.jsx';
import ListPage from './pages/list/ListPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import React bootstrap

// react-router-dom imports
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Create router with JSX Route elements 
const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<SearchPage />} />
    <Route path="report/:appId/:name" element={<ReportPage />} />
    <Route path="list" element={<ListPage />} />
  </Route>));

function App() {

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
