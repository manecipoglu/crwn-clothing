import { selectDirectorySections } from "../redux/directory/directorySelectors";
import { connect } from "react-redux";
import MenuItem from "./MenuItem";
import "./Directory.scss";

function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
}

const mapState = state => ({
  sections: selectDirectorySections(state),
});

export default connect(mapState)(Directory);
