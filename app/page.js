import SlideShow from '@/app/components/default/ui/slider/SlideShow'
import { getArticles } from './lib/apiHelper';

export default async function Page() {

  const {data} = await getArticles()

  return (
    <div>
      <SlideShow articles={data.slice(0,5)}/>
    </div>
  );
}
