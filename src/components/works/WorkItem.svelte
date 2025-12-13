<script lang="ts">
  import { inview } from 'svelte-inview';
  import WorkCard from './WorkCard.svelte';
  import type { Work } from '../../types/work';

  interface Props {
    work: Work;
    index: number;
  }

  let { work, index }: Props = $props();
  let visible = $state(false);
</script>

<div
  use:inview={{ threshold: 0.1, rootMargin: '0px 0px 40% 0px' }}
  oninview_enter={() => (visible = true)}
  class="transform transition-all duration-1500"
  style="transition-delay: {index *
    75}ms; transition-timing-function: cubic-bezier(.1,1,.3,1); filter: {visible
    ? 'blur(0px)'
    : 'blur(4px)'}; opacity: {visible ? 1 : 0}; transform: {visible
    ? 'translateY(0)'
    : 'translateY(30px)'};"
>
  <WorkCard {work} />
</div>
