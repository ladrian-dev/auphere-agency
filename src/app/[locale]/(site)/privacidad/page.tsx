import { createLegalPage } from '@/lib/legal-page';

const legal = createLegalPage('privacy', 'es');

export const generateMetadata = legal.generateMetadata;
export const generateStaticParams = legal.generateStaticParams;
export default legal.Page;
