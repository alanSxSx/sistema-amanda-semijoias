import { Brands } from "./components/Brands";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <main className="">
        <Brands />
        <Dashboard />
      </main>
    </>
  );
}
