import { Brands } from './components/Brands';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

export default function Home() {
  return (
    <main className="mt-7 mx-10 space-y-28 h-[100vh] w-[100vw]">
		<Brands/>
		<Dashboard/>
    </main>
  );
}
