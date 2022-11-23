import  Plain  from "../components/lvltutor/plain";
import data from "../components/lvltutor/tutor/fracciones/fracciones1.json";
import { useAuth } from "../components/Auth";

export default function Index() {
  const { user } = useAuth();
  return (
    <>
      {user && (
        //con el JSON del ejercicio
        <Plain steps={data[0]}></Plain>
        //con identificador
        /* <Tutor id={0}></Tutor> */
      )}
    </>
  );
}
