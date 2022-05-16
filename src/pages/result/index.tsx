//計算結果をジオメトリにmapする
import dynamic from 'next/dynamic';
import Layout from 'src/components/Layout';

const GeometryView = dynamic(() => import('../../views/Result/Geometry'), { ssr: false });
export default function Geometry():React.ReactElement{
  return (
      <>
        <Layout>
          <GeometryView />
        </Layout>
      </>
  )
}
