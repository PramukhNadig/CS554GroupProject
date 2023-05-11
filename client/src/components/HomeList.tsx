import axios from "axios";
import { useEffect, useState } from "react";
import ShowSets from "./ShowSets";

function HomeList({ name }: { name: string }) {
  const [sets, setSets] = useState<any[]>([]);
  const [displayedSets, setDisplayedSets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true);
      setError(false);
      try {
        let url = "https://librelearn-backend-a.herokuapp.com/v1/sets/savedverbose/" + name;
        const saved = await axios.get(url);
        const owned = await axios.get("https://librelearn-backend-a.herokuapp.com/v1/sets/my/"+ name);
        setSets(owned.data.concat(saved.data));
        setDisplayedSets(owned.data.concat(saved.data));
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchSets();
  }, [name]);

  const handleSetDeleted = (setId: string) => {
    setDisplayedSets(displayedSets.filter((set) => set?._id !== setId));
    setSets(sets.filter((set) => set?._id !== setId));
  };

  return (
    <div className="App">
      <br />
      <h1>Your Sets</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {sets.length === 0 && <p>Create or save a set and it'll show up here!</p>}
      {displayedSets.length > 0 && (
        <ShowSets sets={displayedSets} onSetDeleted={handleSetDeleted} />
      )}
    </div>
  );
}

export default HomeList;
