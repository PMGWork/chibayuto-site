import {defineField, defineType, defineArrayMember} from '@sanity-typed/types'
import {ProjectsIcon} from '@sanity/icons'

export const workType = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: ProjectsIcon,
  orderings: [
    {
      title: 'End Date',
      name: 'endDateDesc',
      by: [
        {field: 'endDate', direction: 'desc'},
      ],
    },
    {
      title: 'Start Date',
      name: 'startDateDesc',
      by: [
        {field: 'startDate', direction: 'desc'},
      ],
    }
  ],
  fields: [
    defineField({
      title: 'プロジェクト名',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'プロジェクトID',
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'サムネイル画像',
      name: 'thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'カテゴリ',
      name: 'categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'category' as const}]
        })
      ],
    }),
    defineField({
      title: 'クレジット',
      name: 'credits',
      type: 'array',
      of: [
        defineArrayMember({type: 'document', fields: [
          defineField({
            title: 'クレジット名',
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            title: '名前',
            name: 'name',
            type: 'string',
            validation: (Rule) => Rule.required(),
          }),
        ]}),
      ],
    }),
    defineField({
      title: 'リンク',
      name: 'link',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false,
        allowCredentials: false,
      })
    }),
    defineField({
      title: '開始年月',
      name: 'startDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM'
      }
    }),
    defineField({
      title: '終了年月',
      name: 'endDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM'
      }
    }),
    defineField({
      title: '本文',
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block'
        }),
        defineArrayMember({
          type: 'imageGroup',
          title: '画像',
        }),
        defineArrayMember({
          type: 'embed',
          title: '埋め込み',
        }),
      ],
    }),
  ],
})