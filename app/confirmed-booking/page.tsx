// app/confirmed-booking/page.tsx
"use client"
import {useEffect,useState }from 'react';
import {useRouter} from 'next/navigation';

export default function ConfirmedBookingPage() {

  const [isVisible,setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer =setTimeout(()=> {
      setIsVisible(false);
      router.push('/');
    },2000);

    return() => clearTimeout(timer);
  },[router]);

  if(!isVisible) return <p className="text-center py-24">Redirecting</p>;

  return (
    <h2 className="text-center py-24 w-full text-2xl font-bold text-blue-500"
    >
      Great! ☑ Reservation Success
    </h2>
  );
}
