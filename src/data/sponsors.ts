import transloaditLogo from '@/assets/transloadit.png'

export type SponsorTier = 'gold' | 'silver' | 'bronze'

export interface Sponsor {
  name: string
  url: string
  logo: ImageMetadata
  tier: SponsorTier
}

/**
 * Sponsors whose tier includes a logo on tus.io (see the tiers on
 * https://github.com/sponsors/tus). Gold first, then Silver, then Bronze;
 * keep the order within a tier by sponsorship start date.
 */
export const sponsors: Sponsor[] = [
  {
    name: 'Transloadit',
    url: 'https://transloadit.com',
    logo: transloaditLogo,
    tier: 'silver',
  },
]

export const sponsorUrl = 'https://github.com/sponsors/tus'
export const collectiveUrl = 'https://opencollective.com/tus'
