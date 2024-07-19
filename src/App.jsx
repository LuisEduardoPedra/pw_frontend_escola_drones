import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@popperjs/core/dist/cjs/popper.js'
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Aluno from './componentes/telas/aluno/Aluno'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "alunos",
        element : <Aluno />
      }      
    ]
  }

]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;