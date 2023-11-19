<script setup lang="ts">
import { reactive } from "vue";
import { usePassword } from "@/composables/usePassword.ts";

const options = reactive({
  length: 5,
  includeUppercaseLetters: false,
  includeLowercaseLetters: false,
  includeNumbers: false,
  includeSymbols: false,
});
const { password, passwordStrength, passwordStrengthLabel, generatePassword } =
  usePassword(options);

function onGenerate(): void {
  generatePassword();
}

function onCopy(): void {
  navigator.clipboard.writeText(password.value);
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 w-[28rem]">
    <h1 class="text-xl text-neutral-400">Password Generator</h1>
    <div
      class="flex justify-between items-center gap-4 w-full px-6 py-4 bg-neutral-800"
    >
      <p id="generated-password" class="text-2xl break-all" v-if="password">
        {{ password }}
      </p>
      <p class="text-2xl text-neutral-400" v-else>P@$5W0rD!</p>
      <button
        id="copy-password"
        class="text-teal-400 hover:text-neutral-100 text-xl"
        @click="onCopy"
      >
        <font-awesome-icon :icon="['fas', 'copy']" />
      </button>
    </div>
    <div class="flex flex-col gap-7 w-full px-6 py-4 bg-neutral-800">
      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="text" for="char-length">Character Length</label>
          <p id="character-length" class="text-2xl text-teal-400 font-semibold">
            {{ options.length }}
          </p>
        </div>
        <input
          v-model="options.length"
          name="character-length"
          id="char-length"
          type="range"
          min="5"
          max="20"
          class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-neutral-900"
        />
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <input
            v-model="options.includeUppercaseLetters"
            name="include-uppercase-letters"
            class="h-4 w-4 mr-2 accent-teal-400"
            type="checkbox"
            id="uppercase"
          />
          <label for="uppercase">Include Uppercase Letters</label>
        </div>
        <div class="flex items-center">
          <input
            v-model="options.includeLowercaseLetters"
            name="include-lowercase-letters"
            class="h-4 w-4 mr-2 accent-teal-400"
            type="checkbox"
            id="lowercase"
          />
          <label for="lowercase">Include Lowercase Letters</label>
        </div>
        <div class="flex items-center">
          <input
            v-model="options.includeNumbers"
            name="include-numbers"
            class="h-4 w-4 mr-2 accent-teal-400"
            type="checkbox"
            id="numbers"
          />
          <label for="numbers">Include Numbers</label>
        </div>
        <div class="flex items-center">
          <input
            v-model="options.includeSymbols"
            name="include-symbols"
            class="h-4 w-4 mr-2 accent-teal-400"
            type="checkbox"
            id="symbols"
          />
          <label for="symbols">Include Symbols</label>
        </div>
      </div>

      <div
        class="flex justify-between items-center w-full px-6 py-4 bg-neutral-900"
      >
        <p class="text-sm text-neutral-400">STRENGTH</p>
        <div class="flex gap-1">
          <p class="mr-2" data-test="password-strength" v-if="password">
            {{ passwordStrengthLabel }}
          </p>
          <div
            :class="`h-6 w-2 ${
              i <= passwordStrength
                ? 'bg-yellow-400'
                : 'border-2 border-neutral-400'
            }`"
            :data-test="`${
              i <= passwordStrength ? 'password-strength-bar' : ''
            }`"
            v-for="i in 4"
          ></div>
        </div>
      </div>

      <button
        id="generate-password"
        class="px-6 py-4 border-2 border-teal-400 bg-teal-400 hover:bg-neutral-800 text-neutral-900 hover:text-teal-400"
        @click="onGenerate"
      >
        <span class="mr-3">GENERATE</span>
        <font-awesome-icon :icon="['fas', 'arrow-right']" size="xs" />
      </button>
    </div>
  </div>
</template>
