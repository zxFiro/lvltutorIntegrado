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
import data7 from "../components/lvltutor/tutor/marcelo/fracc3.json";
import data8 from "../components/lvltutor/tutor/marcelo/fracc4.json";
import data9 from "../components/lvltutor/tutor/marcelo/fracc5.json";

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  const {pid} = router.query;
  const query = router.query;
  let data = {};
  switch(query.pid) {
    case "0":
      data={d:data1,topicId:"fracc1"};
        break;
    case "1":
      data={d:data2,topicId:"fracc2"};
        break;
    case "2":
      data={d:data3,topicId:"pot1"};
        break;
    case "3":
      data={d:data4,topicId:"pot2"};
        break;
    case "4":
      data={d:data5,topicId:"pot3"};
        break;
    case "5":
      data={d:data6,topicId:"pot4"};
        break;
    case "6":
      data={d:data7,topicId:"marcelo"};
      break;
    case "7":
      data={d:data8,topicId:"marcelo"};
      break;
    case "8":
      data={d:data9,topicId:"marcelo"};
      break;
    default:
      data={d:data1,topicId:"fracc1"};
  }
  
  return (
    <>
      {user && (
        <Plain steps={data.d[0]} topicId={data.topicId}></Plain>
      )}
    </>
  );
}

