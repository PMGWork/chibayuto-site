import type { PreviewProps } from 'sanity'
import { Flex, Text } from '@sanity/ui'
import { InstagramEmbed, XEmbed } from "react-social-media-embed";
import ReactPlayer from 'react-player';

export function EmbedPreview(props: PreviewProps) {
  const {title: url} = props

  if (typeof url !== 'string' || !url) {
    return (
      <Flex padding={3} align="center" justify="center">
        <Text>URLを入力してください</Text>
      </Flex>
    )
  }

  // URLのドメインを抽出する関数
  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      console.error("Invalid URL:", url);
      return "";
    }
  };

  const domain = getDomain(url);

  // ドメインに基づいて適切なコンポーネントとアイコンを選択
  if (domain.includes('x.com') || domain.includes('twitter.com')) {
    return (
      <Flex padding={3} align="center" justify="center">
        <XEmbed
          url={url}
          width={"100%"}
        />
      </Flex>
    )
  }

  if (domain.includes('instagram.com')) {
    return (
      <Flex padding={3} align="center" justify="center">
        <InstagramEmbed
          url={url}
          width={"100%"}
        />
      </Flex>
    )
  }

  if (domain.includes('youtube.com') || domain.includes('vimeo.com')) {
    return (
      <Flex padding={3} align="center" justify="center">
        <ReactPlayer
          url={url}
          width="100%"
          controls
        />
      </Flex>
    )
  }
}
