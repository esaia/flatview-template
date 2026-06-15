<script setup lang="ts">
import { useGlobalStore } from "../../../store/useGlobal";
import { provide, ref, onMounted, onUnmounted } from "vue";

const globalStore = useGlobalStore();

const isFirstRun = ref(true);
const mouseX = ref(-400);
const mouseY = ref(-400);
const canvasRef = ref<HTMLDivElement | null>(null);

let animationFrameId: number | null = null;
let targetX = 0;
let targetY = 0;

const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

const startAnimation = () => {
  if (animationFrameId) return;

  const animate = () => {
    const x = 0.06;
    mouseX.value = lerp(mouseX.value, targetX, x);
    mouseY.value = lerp(mouseY.value, targetY, x);

    if (
      Math.abs(mouseX.value - targetX) > x ||
      Math.abs(mouseY.value - targetY) > x
    ) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
    }
  };

  animationFrameId = requestAnimationFrame(animate);
};

const handleMouseMove = (e: MouseEvent) => {
  if (!canvasRef.value) return;

  const canvasRect = canvasRef.value.getBoundingClientRect();
  const tooltip = document.querySelector<HTMLDivElement>(".irep-tooltip");
  const hoverdPath =
    globalStore.hoverdSvg?.nodeName === "path" ? globalStore.hoverdSvg : null;

  let x = e.clientX - canvasRect.left;
  let y = e.clientY - canvasRect.top;

  if (tooltip && hoverdPath) {
    const pathRect = hoverdPath.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const halfCanvasX = canvasRect.left + canvasRect.width / 2;

    const isRight = pathRect.left > halfCanvasX;
    const isBottom = e.clientY - canvasRect.top > canvasRect.height / 2;

    x = e.clientX - canvasRect.left - (isRight ? tooltipRect.width : -20);
    y = e.clientY - canvasRect.top - (isBottom ? tooltipRect.height : -20);

    x = Math.max(0, Math.min(canvasRect.width - tooltipRect.width, x));
    y = Math.max(0, Math.min(canvasRect.height - tooltipRect.height, y));
  }

  targetX = x;
  targetY = y;

  if (isFirstRun.value) {
    mouseX.value = targetX;
    mouseY.value = targetY;
    isFirstRun.value = false;
  }

  startAnimation();
};

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

provide("mouseX", mouseX);
provide("mouseY", mouseY);
</script>

<template>
  <div ref="canvasRef" class="irep-mouse-tracker">
    <slot />
  </div>
</template>
