import Header from "../../components/Header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}

export default MainLayout;