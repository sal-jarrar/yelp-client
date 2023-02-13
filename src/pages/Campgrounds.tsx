import { Col, Row } from "react-bootstrap";
import Layout from "../components/Layout";
import Campground from "../components/Campground";
import Paginate from "../components/Paginate";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_CAMPGROUNDS } from "../graphql/campground/Query";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Campgrounds() {
  const { data, loading, error } = useQuery(GET_CAMPGROUNDS);
  const { pageNumber } = useParams();
  const page = Number(pageNumber) || 1;

  // const pageNumber = match.params.pageNumber || 1
  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error.message}</Message>;
  data && console.log([...data.getCapmgrounds], "d");
  return (
    <Layout showFooter={true}>
      <h2>Campgrounds</h2>
      <Row xs={1} md={3} className="g-3">
        {data ? (
          [...data.getCapmgrounds].map((camp) => (
            <Col key={camp.camp_id} sm={12} md={6} lg={3} xl={3}>
              <Campground campground={camp} />
            </Col>
          ))
        ) : (
          <Loader />
        )}
      </Row>
      <Paginate pages={[...data.getCapmgrounds].length / 10} page={page} />
    </Layout>
  );
}

export default Campgrounds;
