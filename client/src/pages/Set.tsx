import Set from "../components/Set";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();
  console.log("id", id);

  const { data } = useQuery(["Set", id], () => {
    return axios.get("/v1/sets/" + id).then((res) => {
      return res.data;
    });
  });
  return (
    <div className="app">
      <Set
        subject={data?.subject}
        title={data?.title}
        description={data?.description}
        cards={data?.cards}
      ></Set>
    </div>
  );
}

export default Home;
