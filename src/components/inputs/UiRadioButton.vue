<template>
  <div :class="['ui-radio-button', { disabled }]">
    <div class="ui-radio-button__controls">
      <div
        @click="select"
        :class="['ui-radio-button__controller', { checked: checked }]"
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
              d="M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z"
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
              d="M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"
            ></path>
          </svg>
        </template>
      </div>

      <div
        :class="['ui-radio-button__blink', { show: isFocused }]"
        :style="[{ backgroundColor: checked ? color : 'rgba(0, 0, 0, 0.4)' }]"
      ></div>

      <input
        type="radio"
        :id="`radio-${id}`"
        ref="input"
        @change="$emit('update:modelValue', radioButton)"
        @focus="focus"
        @blur="blur"
        v-model="radioButton"
        :disabled="disabled"
        :value="value"
      />
    </div>

    <label :for="`radio-${id}`">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "UiRadioButton",
  props: {
    modelValue: {
      type: String,
      default: "",
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
      radioButton: this.modelValue,
      id: null,
      isFocused: false,
    };
  },
  computed: {
    checked() {
      return typeof this.radioButton === "boolean"
        ? this.radioButton
        : this.radioButton.includes(this.value);
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
      this.radioButton = val;
    },
  },
};
</script>

<style scoped lang="scss">
.ui-radio-button {
  display: flex;
  align-items: center;

  &.disabled {
    .ui-radio-button__controls {
      &:hover .ui-radio-button__blink {
        transform: scale(0);
        opacity: 0;
      }
    }

    .ui-radio-button__controls,
    label {
      cursor: default;
    }
  }

  .ui-radio-button__controls {
    position: relative;
    margin-right: 8px;

    .ui-radio-button__controller {
      display: flex;
      position: relative;
      z-index: 1;
    }

    &:hover .ui-radio-button__blink {
      transform: scale(1);
      opacity: 0.4;
    }
    .ui-radio-button__blink {
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

  input[type="radio"] {
    user-select: none;
    opacity: 0;
    position: absolute;
  }
  .ui-radio-button__controller,
  label {
    cursor: pointer;
  }
}
</style>
