import BootScreen from '@/components/Desktop/BootScreen';
import DesktopShell from '@/components/Desktop/DesktopShell';
import MobileLayout from '@/components/Mobile/MobileLayout';
import { fetchPortfolioData } from '@/lib/data';
import type { PortfolioData } from '@/lib/types';

export default async function PortfolioPage() {
  const data: PortfolioData = await fetchPortfolioData();
  return <><BootScreen name={data.profile.name}/><DesktopShell data={data} /><MobileLayout data={data} /></>;
}

