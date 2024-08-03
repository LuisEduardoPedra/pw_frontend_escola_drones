import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@popperjs/core/dist/cjs/popper.js'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from "./componentes/MenuPrivado";
import Home from './componentes/telas/Home'
import Aluno from './componentes/telas/aluno/Aluno'
import Curso from './componentes/telas/curso/Curso'
import Login from "./componentes/telas/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element : <Login/>
      }
    ]
  }
  ,{
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "alunos",
        element : <Aluno />
      },
      {
        path : "cursos",
        element : <Curso />
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