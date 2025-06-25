import {defineField, defineType, defineArrayMember} from '@sanity-typed/types'

export const imageGroupType = defineType({
  title: '画像',
  name: 'imageGroup',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'キャプション',
            }),
          ]
        }),
      ]
    })
  ],
  preview: {
    select: {
      previewImage: 'images.0.asset',
      caption0: 'images.0.caption',
      caption1: 'images.1.caption',
      caption2: 'images.2.caption',
    },
    prepare: ({previewImage, caption0, caption1, caption2}) => {
      const captions = [caption0, caption1, caption2].filter(Boolean)
      const subtitle = captions.length > 0 ? `${captions.join(', ')}` : ''
      const hasMoreAuthors = Boolean(caption2)
      return {
        title: '画像グループ',
        subtitle: hasMoreAuthors ? `${subtitle}…` : subtitle,
        media: previewImage
      }
    }
  }
})
