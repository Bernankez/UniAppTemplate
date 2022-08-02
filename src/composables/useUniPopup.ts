import { ref, unref, watch, Ref, onMounted } from "vue";
import { getUniEnvironment } from "@/utils";
import { onReady } from "@dcloudio/uni-app";

type MaybeRef<T> = Ref<T> | T;

export function useUniPopup(el: MaybeRef<any>, options?: { show?: MaybeRef<boolean>; lazyLoading?: boolean }) {
  const { show = ref(false), lazyLoading = false } = options || {};
  const _show = ref(show);
  watch(
    _show,
    newVal => {
      if (unref(el)) {
        toggle(newVal);
      } else {
        const env = getUniEnvironment();
        if (env === "page") {
          onReady(() => {
            toggle(newVal);
          });
        } else if (env === "component") {
          onMounted(() => {
            toggle(newVal);
          });
        }
      }
    },
    { immediate: !lazyLoading }
  );

  function toggle(show: boolean) {
    if (show) {
      unref(el)?.open();
    } else {
      unref(el)?.close();
    }
  }

  return {
    show: _show,
    onChange: (v: { show: boolean; type: string }) => {
      _show.value = v.show;
    },
  };
}
