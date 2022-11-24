import  Plain  from "../components/lvltutor/plain";
import { useAuth } from "../components/Auth";

//los ejercicios debiesen obtenerse de la db
import { useRouter } from 'next/router';
import data1 from "../components/lvltutor/tutor/fracciones/fracciones1.json";
import data2 from "../components/lvltutor/tutor/fracciones/fracciones2.json";
import data3 from "../components/lvltutor/tutor/potencias/potencias1.json";
import data4 from "../components/lvltutor/tutor/potencias/potencias2.json";
import data5 from "../components/lvltutor/tutor/potencias/potencias3.json";
import data6 from "../components/lvltutor/tutor/potencias/potencias4.json";


export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  const {pid} = router.query;
  const query = router.query;
  let data = [{}];
  switch(query.pid) {
    case "0":
      data=data1;
        break;
    case "1":
      data=data2;
        break;
    case "2":
      data=data3;
        break;
    case "3":
      data=data4;
        break;
    case "4":
      data=data5;
        break;
    case "5":
      data=data6;
        break;
    default:
      data=data1;
  }
  
  return (
    <>
      {user && (
        <Plain steps={data[0]}></Plain>
      )}
    </>
  );
}

