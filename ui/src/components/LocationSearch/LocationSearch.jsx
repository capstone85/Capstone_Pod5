import SearchIcon from "@mui/icons-material/Search";
import "./LocationSearch.css";

export default function LocationSearchBar(props) {
  return (
    <div className="searchbar">
      <input
        placeholder="Enter your zipcode"
        className="input"
        value={props.searchBar}
        onChange={(event) => props.handleOnSearchBarChange(event.target.value)}
      />
      <SearchIcon className="search-icon" fontSize="large" />
    </div>
  );
}
