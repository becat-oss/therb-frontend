import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {

  const router = useRouter();

  useEffect(()=>{
    router.replace('/constructions');
    // router.replace('/projects');
  },[]);
  return (
    <>
      <div>redirecting</div>
      {/* <Layout>
        <IndexView />
      </Layout> */}
    </>
    );
}
