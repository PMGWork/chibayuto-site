<script lang="ts">
  import type { Work } from '../../types/work';

  interface Props {
    work: Work;
  }

  let { work }: Props = $props();

  const workTags = $derived(work.data.tags || []);
  const optimizedImage = $derived(work.optimizedImage);
</script>

<div class="flex flex-col gap-4 pb-8">
  <a href={`/works/${work.id}`}>
    <div
      class="corner-lg relative isolate w-full overflow-hidden"
      style="padding-bottom: 56.25%"
    >
      <!-- 画像 -->
      {#if optimizedImage}
        <img
          class="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          src={optimizedImage.src}
          srcset={optimizedImage.srcSet.attribute}
          {...optimizedImage.attributes.img}
          alt={work.id}
        />
      {:else}
        <div
          class="corner-lg absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-200"
        >
          <p class="text-gray-500">画像がありません</p>
        </div>
      {/if}

      <!-- ピン留めアイコン -->
      {#if work.data.isPinned}
        <div class="bg-primary absolute top-3 right-3 rounded-full p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-white"
          >
            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h6v6h2v-6h6v-2l-2-2z" />
          </svg>
        </div>
      {/if}
    </div>
  </a>
  <div class="flex flex-col gap-2">
    <h3 class="text-xl">{work.title || work.id}</h3>
    <div class="flex gap-2">
      {#each workTags as tag (tag)}
        <span
          class="corner-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium"
        >
          {tag}
        </span>
      {/each}
    </div>
  </div>
</div>
