import "./ProductSearch.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar(props) {
  return (
    <div className="searchbar-section">
      <div className="searchbar">
        <input
          placeholder="Search"
          className="input"
          value={props.searchbar}
          onChange={(event) =>
            props.handleOnSearchbarChange(event.target.value)
          }
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
