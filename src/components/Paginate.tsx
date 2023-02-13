import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page }: { pages: number; page: number }) => {
  return pages > 1 ? (
    <Pagination className="mt-5">
      {Array.from(Array(pages).keys()).map((x) => (
        <LinkContainer key={x + 1} to={`/page/${x + 1}`}>
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null;
};

export default Paginate;
