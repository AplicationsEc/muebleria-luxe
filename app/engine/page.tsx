import { withAuth } from "../lib/withAuth";
const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 lg:ml-64">
        <Home />
      </main>
    </div>
  );
};

export default withAuth(Home);
