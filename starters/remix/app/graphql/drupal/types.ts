import { FragmentOf, ResultOf } from 'gql.tada'
import { MediaImageFragment } from '~/graphql/drupal/fragments/media'
import {
  NodeArticleFragment,
  NodePageFragment,
} from '~/graphql/drupal/fragments/node'
import { TermTagsFragment } from '~/graphql/drupal/fragments/terms'
import { LinkFragment } from './fragments/misc'


export type EntityFragmentType =
  | FragmentOf<typeof NodePageFragment>
  | FragmentOf<typeof NodeArticleFragment>
  | FragmentOf<typeof TermTagsFragment>

// Types generated from the GraphQL schema
export type MediaImage = ResultOf<typeof MediaImageFragment> | null
export type Link = ResultOf<typeof LinkFragment>
