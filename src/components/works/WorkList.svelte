<script lang="ts">
  import WorkItem from './WorkItem.svelte';
  import CategoryButtons from './CategoryButtons.svelte';
  import type { Work } from '../../types/work';

  interface Props {
    initialTags: string[];
    initialWorks: Work[];
  }

  let { initialTags, initialWorks }: Props = $props();

  let selectedTag: string | null = $state(null);

  const filteredWorks = $derived(
    selectedTag
      ? initialWorks.filter((work) =>
          work.data.tags?.some((tag) => tag === selectedTag),
        )
      : initialWorks,
  );

  const handleSelectTag = (tag: string | null) => {
    selectedTag = tag;
  };
</script>

<div class="flex w-full flex-col gap-8">
  <!-- モバイル・タブレット用：上部にカテゴリボタン -->
  <div class="lg:hidden">
    <CategoryButtons
      tags={initialTags}
      {selectedTag}
      onSelectTag={handleSelectTag}
    />
  </div>

  <div class="flex flex-col justify-between gap-16 lg:flex-row">
    <div class="flex-1">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        {#each filteredWorks as work, index (selectedTag + '-' + (work.id || index))}
          <WorkItem {work} {index} />
        {/each}
      </div>
    </div>

    <!-- デスクトップ用：右側にカテゴリボタン -->
    <div class="hidden lg:block lg:w-32">
      <div class="lg:sticky lg:top-40 lg:ml-auto">
        <CategoryButtons
          tags={initialTags}
          {selectedTag}
          onSelectTag={handleSelectTag}
        />
      </div>
    </div>
  </div>
</div>
