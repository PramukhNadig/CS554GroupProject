import axios from "axios";
import { useQuery } from "react-query";

function Home() {
  const { data } = useQuery("todos", () => {
    return axios.get("/v1/sets").then((res) => {
      return res.data;
    });
  });
  return (
    <p>
      {data?.map((v: any) => {
        return <div>{v.title}</div>;
      })}
    </p>
  );
}

export default Home;
