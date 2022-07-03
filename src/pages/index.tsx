import dynamic from 'next/dynamic';
import Header from 'src/components/Header';
import { AppProvider } from 'src/AppContext';
import Layout from 'src/components/Layout';
import Button from '@material-ui/core/Button';
import { useAppConfig } from 'src/AppConfig';
import { useEditor } from 'src/editor/useEditor';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const IndexView = dynamic(() => import('../views/IndexView'), { ssr: false });

export default function Index() {

  const router = useRouter();

  useEffect(()=>{
    router.replace('/result');
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
