import SlideShow from '@/app/(site)/components/default/ui/Home/slider/SlideShow'
import { getArticles } from '../lib/apiHelper';
import LatestArticles from './components/default/ui/Home/LatestArticles/LatestArticles';

export default async function Page() {

  const {data} = await getArticles()
  console.log(data)

  return (
    <div>
      <SlideShow articles={data.slice(0,5)}/>
      <LatestArticles />
    </div>
  );
}
