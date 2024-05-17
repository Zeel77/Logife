'use client'
import { useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
      <div className="flex flex-col justify-center items-center h-[100%] bg-blue-50 gap-[2vmax]">
        <p className="text-[3vmax] font-bold text-blue-500">Welcome to AquaOPS!</p>
        <button onClick={()=>{router.push('/login')}} className="rounded p-3 bg-blue-800 text-white text-[1.5vmax] font-semibold">Get Started</button>
      </div>
  );
}
