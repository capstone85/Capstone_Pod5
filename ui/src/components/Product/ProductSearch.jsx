import "./ProductSearch.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar(props) {
  return (
    <div className="search-bar-section">
      <div className="search-bar" id="search-bar">
        <input
          placeholder="Search"
          className="input"
          value={props.searchbar}
          onChange={(event) =>
            props.handleOnSearchbarChange(event.target.value)
          }
        />
        <div className="search-btn-emoji">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
