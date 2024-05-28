import DetailView from "../../components/DetailView/DetailView";
import './DetailPage.css';
import { Link } from "react-router-dom";
const DetailPage = () => {
  return (
    <div>
      <nav>
        <h1>Detail View</h1>
        <Link to="/">Back to Home</Link>
      </nav>

      <DetailView />
    </div>
  );
};

export default DetailPage;
