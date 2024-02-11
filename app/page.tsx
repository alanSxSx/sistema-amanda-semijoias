import { Brands } from './components/Brands';
import Dashboard from './components/Chart';
import { Header } from './components/Header';

export default function Home() {
  return (
    <main className="mt-7 mx-10 space-y-12">
		<Header/>
		<Brands/>
		<Dashboard/>
    </main>
  );
}
