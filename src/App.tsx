import { Banner, Navbar, Row } from "./components";
import "./App.scss";
import { requests } from "./assets";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Row
        islargeRow={true}
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        islargeRow={false}
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        islargeRow={true}
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        islargeRow={false}
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        islargeRow={true}
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        islargeRow={false}
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        islargeRow={true}
        title="Romanse Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        islargeRow={false}
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;
