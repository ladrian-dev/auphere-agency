'use client';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { NarrativeSequence, NarrativeAct } from './NarrativeSequence';
import type { StageLabels } from './NarrativeStage';

/**
 * Puente entre el copy traducido y el plano vivo. Existe para que
 * `NarrativeStage` siga siendo tonto respecto a i18n y la página siga siendo
 * un componente de servidor: solo este envoltorio es cliente.
 */
export function HomeNarrative({ children }: { children: ReactNode }) {
  const t = useTranslations('stage');

  const labels: StageLabels = {
    channels: [
      t('channels.whatsapp'),
      t('channels.instagram'),
      t('channels.tiktok'),
      t('channels.voice'),
    ],
    core: t('core'),
    out: t('out'),
    human: t('human'),
    tools: [t('tools.calendar'), t('tools.crm'), t('tools.payments'), t('tools.browser')],
    tracks: [t('tracks.hire'), t('tracks.resell'), t('tracks.embed')],
    stages: [t('stages.diagnose'), t('stages.configure'), t('stages.production')],
    annotations: {
      sharedEngine: t('annotations.sharedEngine'),
      t0: t('annotations.t0'),
      t1: t('annotations.t1'),
      t2: t('annotations.t2'),
      tenantA: t('annotations.tenantA'),
      tenantB: t('annotations.tenantB'),
      wall: t('annotations.wall'),
      rowData: t('annotations.rowData'),
      rowConv: t('annotations.rowConv'),
    },
  };

  return <NarrativeSequence labels={labels}>{children}</NarrativeSequence>;
}

export { NarrativeAct };
