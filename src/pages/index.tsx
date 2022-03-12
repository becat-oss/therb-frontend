import dynamic from 'next/dynamic';
import Header from 'src/components/Header';
import { AppProvider } from 'src/AppContext';
import Layout from 'src/components/Layout';
import Button from '@material-ui/core/Button';
import { useAppConfig } from 'src/AppConfig';
import { useEditor } from 'src/editor/useEditor';


const IndexView = dynamic(() => import('../views/IndexView'), { ssr: false });

export default function Index() {

  return (
    <>
      <Layout>
        <IndexView />
      </Layout>
    </>
    );
}
