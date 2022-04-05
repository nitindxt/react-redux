import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { StrictMode } from "react";//remove useState
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
//import ThemeContext from "./ThemeContext";
import { Provider } from "react-redux";
import store from "./Store";

const App = () => {
  // const theme = useState("darkblue"); //remove to use reducx provider
  return (
    <StrictMode>
      <Provider store={store}>{/*earlier through context <ThemeContext.Provider value={theme}>  */}
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
