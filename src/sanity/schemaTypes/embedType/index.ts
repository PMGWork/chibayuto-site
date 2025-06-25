import {defineField, defineType} from '@sanity-typed/types'
import {ImageIcon} from '@sanity/icons'
import {EmbedPreview} from './embedPreview'

export const embedType = defineType({
  name: 'embed',
  type: 'object',
  title: 'Embed',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
    }),
  ],
  preview: {
    select: {title: 'url'},
  },
  components: {
    preview: EmbedPreview,
  },
})