<template>
  <div :class="['ui-switch', { checked }]">
    <input
      type="checkbox"
      class="pointer"
      @focus="focus"
      @blur="blur"
      @change="$emit('update:modelValue', checked)"
      v-model="checked"
    />
    <div
      class="ui-switch__track"
      :style="{ backgroundColor: checked ? color : '#9e9e9e' }"
    ></div>
    <div
      class="ui-switch__thumb"
      :style="{ backgroundColor: checked ? color : '#ffffff' }"
    >
      <div class="ui-switch__blink-wrap">
        <div
          :class="['ui-switch__blink', { show: isFocused }]"
          :style="[{ backgroundColor: checked ? color : 'rgba(0, 0, 0, 0.4)' }]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiSwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#1867c0",
    },
  },
  emits: ["update:modelValue", "focus", "blur"],
  data() {
    return {
      checked: this.modelValue,
      isFocused: false,
    };
  },
  methods: {
    focus() {
      this.isFocused = true;
      this.$emit("focus");
    },
    blur() {
      this.isFocused = false;
      this.$emit("blur");
    },
  },
  watch: {
    modelValue(val) {
      this.checked = val;
    },
  },
};
</script>

<style scoped lang="scss">
.ui-switch {
  position: relative;
  width: 32px;
  height: 20px;

  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    z-index: 1;
  }

  .ui-switch__track {
    background-color: #9e9e9e;
    opacity: 0.4;
    border-radius: 14px;
    width: 100%;
    height: 100%;
  }

  .ui-switch__thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 3px;
    top: calc(50% - 6px);
    width: 12px;
    height: 12px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: all 0.2s;

    .ui-switch__blink-wrap {
      position: relative;

      .ui-switch__blink {
        position: absolute;
        top: calc(50% - 18px);
        left: calc(50% - 18px);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        transform: scale(0);
        transition: all 0.2s;
        opacity: 0;
        z-index: 0;

        &.show {
          transform: scale(1);
          opacity: 0.4;
        }
      }
    }
  }
  &.checked .ui-switch__thumb {
    left: calc(100% - 12px - 3px);
  }
}
</style>
