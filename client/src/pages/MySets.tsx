import Set from "../components/Set";
import axios from "axios";
import { useQuery } from "react-query";

function App() {
  const { data } = useQuery(["MySets"], () => {
    return axios.get("/v1/sets/my").then((res) => {
      return res.data;
    });
  });
  console.log("data", data);
  return (
    <div className="app">
      {data?.map((v: any) => {
        return (
          <Set
            subject={v?.subject}
            title={v?.title}
            description={v?.description}
            cards={v?.cards}
          ></Set>
        );
      })}
    </div>
  );
}

export default App;
