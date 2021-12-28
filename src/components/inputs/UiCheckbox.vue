<template>
  <div :class="['ui-checkbox', { disabled }]">
    <div class="ui-checkbox__controls">
      <div
        @click="select"
        :class="['ui-checkbox__controller', { checked: checked }]"
      >
        <template v-if="checked">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            role="img"
            aria-hidden="true"
            :fill="color"
          >
            <path
              d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
            ></path>
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            role="img"
            aria-hidden="true"
            fill="#777777"
          >
            <path
              d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"
            ></path>
          </svg>
        </template>
      </div>

      <div
        :class="['ui-checkbox__blink', { show: isFocused }]"
        :style="[{ backgroundColor: checked ? color : 'rgba(0, 0, 0, 0.4)' }]"
      ></div>

      <input
        type="checkbox"
        :id="`checkbox-${id}`"
        ref="input"
        @change="$emit('update:modelValue', checkbox)"
        @focus="focus"
        @blur="blur"
        v-model="checkbox"
        :disabled="disabled"
        :value="value"
      />
    </div>

    <label :for="`checkbox-${id}`">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "UiCheckbox",
  props: {
    modelValue: {
      type: [Array, Boolean],
      default: false,
    },
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    label: {
      type: [String, Number],
      default: "",
    },
    color: {
      type: String,
      default: "#1867c0",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "focus", "blur"],
  data() {
    return {
      checkbox: this.modelValue,
      id: null,
      isFocused: false,
    };
  },
  computed: {
    checked() {
      return typeof this.checkbox === "boolean"
        ? this.checkbox
        : this.checkbox.includes(this.value);
    },
  },
  mounted() {
    this.id = this._.uid;
  },
  methods: {
    select() {
      this.$refs.input.click();
    },
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
      this.checkbox = val;
    },
  },
};
</script>

<style scoped lang="scss">
.ui-checkbox {
  display: flex;
  align-items: center;

  &.disabled {
    .ui-checkbox__controls {
      &:hover .ui-checkbox__blink {
        transform: scale(0);
        opacity: 0;
      }
    }

    .ui-checkbox__controls,
    label {
      cursor: default;
    }
  }

  .ui-checkbox__controls {
    position: relative;
    margin-right: 8px;

    .ui-checkbox__controller {
      display: flex;
      position: relative;
      z-index: 1;
    }

    &:hover .ui-checkbox__blink {
      transform: scale(1);
      opacity: 0.4;
    }
    .ui-checkbox__blink {
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

  input[type="checkbox"] {
    user-select: none;
    opacity: 0;
    position: absolute;
  }
  .ui-checkbox__controller,
  label {
    cursor: pointer;
  }
}
</style>
