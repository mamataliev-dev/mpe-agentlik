<template>
  <div>
    <div class="bg-white rounded-br-12 mb-4">
      <div class="p-4 lg:p-6 border-b border-borderColor">
        <h2 class="font-medium text-[16px] lg:text-[20px] text-green-dark">
          {{ title }}
        </h2>
      </div>

      <ul class="p-3 flex flex-col gap-1">
        <li v-for="(item, index) in links" :key="item.path">
          <ULink
            :to="item.path"
            active-class="block text-[14px] lg:text-base px-4 py-3 rounded-br-8 bg-green-light text-green"
            exact-active-class="block text-[14px] lg:text-base px-4 py-3 rounded-br-8 bg-green-light text-green"
            inactive-class="block text-[14px] lg:text-base px-4 py-3 text-grey-0 rounded-br-8 hover:bg-green-light hover:text-green transition-all duration-200 ease-in-out"
          >
            {{ item.label }}
          </ULink>
        </li>
      </ul>
    </div>

    <div class="bg-white rounded-br-12">
      <div class="p-24 border-b border-borderColor">
        <span class="text-base text-grey">So'rovnoma</span>
        <h2>Veb saytimizni baholang</h2>
      </div>

      <div class="flex flex-col gap-y-6 p-6">
        <div class="space-y-6">
          <URadio
            v-for="method of methods"
            :key="method.value"
            v-model="selected"
            v-bind="method"
            :ui="{
              color: 'text-green',
              border: 'border border-[#C2C2C3]',
              ring: 'focus-visible:ring-2 focus-visible:ring-green dark:focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
              label: 'text-green-dark',
            }"
          />
        </div>

        <UButton
          block
          variant="solid"
          class="shadow-none text-center rounded-br-8 bg-green hover:bg-[#4ADFAE] py-4 font-semibold text-base transition-all duration-200 ease-in-out"
          :ui="{ variant: { solid: 'text-white' } }"
          label="Ovoz berish"
          @click="$emit('submitFeedback', selected)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  links: {
    type: Array,
    default: () => [],
  },
});

const selected = ref("good");
const methods = [
  { value: "good", label: "Yaxshi" },
  { value: "satisfied", label: "Qoniqarli" },
  { value: "bad", label: "Yomon" },
];
</script>

<style lang="scss" scoped></style>
