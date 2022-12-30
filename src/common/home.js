import { Fragment } from "react";
import SearchForm from "../songs/components/SearchForm";

function Home() {
  return (
    <Fragment>
      <SearchForm querySearch={""}></SearchForm>
    </Fragment>
  );
}

export default Home;
