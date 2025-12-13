<script lang="ts">
  interface Props {
    tags: string[];
    selectedTag: string | null;
    onSelectTag: (tag: string | null) => void;
  }

  let { tags, selectedTag, onSelectTag }: Props = $props();

  const getButtonClass = (isSelected: boolean) => {
    const baseClass =
      'px-3 sm:px-4 py-1 corner-full text-sm sm:text-body-sm transition-all duration-300 ease-in-out cursor-pointer';
    const selectedClass = 'bg-primary text-background border border-primary';
    const unselectedClass =
      'bg-background text-gray-600 border border-gray-200 hover:border-primary';
    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };
</script>

<!-- モバイル用 -->
<div class="lg:hidden">
  <div class="flex flex-wrap gap-2">
    <button
      class={getButtonClass(selectedTag === null)}
      onclick={() => onSelectTag(null)}
    >
      すべて
    </button>
    {#each tags as tag (tag)}
      <button
        class={getButtonClass(selectedTag === tag)}
        onclick={() => onSelectTag(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
</div>

<!-- デスクトップ用 -->
<div class="hidden flex-col items-end gap-2 lg:flex">
  <button
    class={getButtonClass(selectedTag === null)}
    onclick={() => onSelectTag(null)}
  >
    すべて
  </button>
  {#each tags as tag (tag)}
    <button
      class={getButtonClass(selectedTag === tag)}
      onclick={() => onSelectTag(tag)}
    >
      {tag}
    </button>
  {/each}
</div>
