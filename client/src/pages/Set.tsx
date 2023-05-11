import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import FlashCard from '../components/Flashcard';

function Home() {
  const { id } = useParams();
  console.log("id", id);

  const { data } = useQuery(["Set", id], () => {
    return axios.get("https://librelearn-backend-a.herokuapp.com/v1/sets/" + id).then((res) => {
      return res.data;
    });
  });
  return (
    <div className="app">
      <FlashCard
        setId={data?._id}
        subject={data?.subject}
        title={data?.title}
        description={data?.description}
        owner={data?.owner}
        cards={data?.cards}
      ></FlashCard>
    </div>
  );
}

export default Home;
