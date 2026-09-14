import { createLegalPage } from '@/lib/legal-page';

const legal = createLegalPage('security', 'en');

export const generateMetadata = legal.generateMetadata;
export const generateStaticParams = legal.generateStaticParams;
export default legal.Page;
