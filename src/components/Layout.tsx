import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
type Props = {
  children?: JSX.Element | JSX.Element[];
  showFooter?: boolean;
};

function Layout({ showFooter, children }: Props) {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default Layout;
