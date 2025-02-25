import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './styles/styles.css';
import App from './pages/App.tsx';
import QuizPage from './pages/QuizPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // This is your main page
  },
  {
    path: "/quiz", // This is the path for the quiz page
    element: <QuizPage />, // This is the component that will be displayed when navigating to /quiz
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
