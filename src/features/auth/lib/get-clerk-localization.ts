export async function getClerkLocalization(locale: string) {
  switch (locale) {
    case 'fr':
      return (await import('@clerk/localizations/fr-FR')).frFR;
    default:
      return (await import('@clerk/localizations/en-US')).enUS;
  }
}