import {defineField, defineType} from '@sanity-typed/types'
import {TagsIcon} from '@sanity/icons'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      title: 'カテゴリ名',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'カテゴリID',
      name: 'slug',
      type: 'slug',
    }),
  ],
})