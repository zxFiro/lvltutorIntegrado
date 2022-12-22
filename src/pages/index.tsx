import  Plain  from "../components/lvltutor/plain";
import { useAuth } from "../components/Auth";

//los ejercicios debiesen obtenerse de la db
import { useRouter } from 'next/router';

import type {ExType} from "../components/lvltutor/Tools/ExcerciseType";

import data1 from "../components/lvltutor/tutor/fracciones/fracciones1.json";
import data2 from "../components/lvltutor/tutor/fracciones/fracciones2.json";
import data3 from "../components/lvltutor/tutor/potencias/potencias1.json";
import data4 from "../components/lvltutor/tutor/potencias/potencias2.json";
import data5 from "../components/lvltutor/tutor/potencias/potencias3.json";
import data6 from "../components/lvltutor/tutor/potencias/potencias4.json";
import data7 from "../components/lvltutor/tutor/marcelo/fracc3.json";
import data8 from "../components/lvltutor/tutor/marcelo/fracc4.json";
import data9 from "../components/lvltutor/tutor/marcelo/fracc5.json";

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  //const {pid} = router.query;
  const query = router.query;
  type data={
    d:Array<ExType>;
    topicId:string;
  }
  let d0:data;
  switch(query.pid) {
    case "0":
      d0={d:data1 as Array<ExType>,topicId:"fracc1"};
        break;
    case "1":
      d0={d:data2 as Array<ExType>,topicId:"fracc2"};
        break;
    case "2":
      d0={d:data3 as Array<ExType>,topicId:"pot1"};
        break;
    case "3":
      d0={d:data4 as Array<ExType>,topicId:"pot2"};
        break;
    case "4":
      d0={d:data5 as Array<ExType>,topicId:"pot3"};
        break;
    case "5":
      d0={d:data6 as Array<ExType>,topicId:"pot4"};
        break;
    case "6":
      d0={d:data7 as Array<ExType>,topicId:"marcelo"};
      break;
    case "7":
      d0={d:data8 as Array<ExType>,topicId:"marcelo"};
      break;
    case "8":
      d0={d:data9 as Array<ExType>,topicId:"marcelo"};
      break;
    default:
      d0={d:data1 as Array<ExType>,topicId:"fracc1"};
  }

  return (
    <>
      {user && (
        <Plain topicId={d0.topicId} steps={d0.d[0]!}></Plain>
      )}
    </>
  );
}

