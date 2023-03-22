import { useEffect, useState } from "react";

import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = "https://meowfacts.herokuapp.com/";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com/";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [reload, setReaload] = useState(0);
  const [factError, setFactError] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        if (!res.ok) {
          setFactError("We can't get the fact");
        }
        return res.json();
      })
      .then((resData) => {
        const data = resData.data[0];
        setFact(data);
      });
  }, [reload]);
    
  useEffect(() => {
    if(!fact) return
      const threeFirstWords = fact.split(" ", 3).join(" ");
    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact])

  const doReload = () => {
    let reloadSum = reload + 1
    setReaload(reloadSum);
  }

  return (
    <main>
      <div>
        <h1>Kittens App</h1>
        <button onClick={() => doReload()}>MORE KITTENS!!</button>
      </div>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}
