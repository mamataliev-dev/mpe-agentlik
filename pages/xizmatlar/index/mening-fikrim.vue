<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['services.opinion_header_text'] }}
      </p>
    </div>

    <div>
      <UForm :validate="validate" :state="state" @submit="submitMessage"
        class="flex flex-col items-start lg:flex-row justify-between gap-x-8 p-8 bg-white rounded-br-16">
        <div class="w-full lg:w-4/12 flex flex-col gap-y-4 mb-6 lg:mb-0">
          <UFormGroup name="radio">
            <URadio v-for="method of methods" class="last:mt-6" :key="method.value" v-model="selected" v-bind="method" :ui="{
              color: 'text-green',
              border: 'border border-[#C2C2C3]',
              ring: 'focus-visible:ring-2 focus-visible:ring-green dark:focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
              label: 'text-green-dark cursor-pointer',
            }" />
          </UFormGroup>
        </div>

        <div class="w-full flex flex-col gap-y-[16px]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <UFormGroup :label="translations['services.name_label']" name="first_name" :ui="{
              label: {
                base: 'block font-medium text-[#1D2825] text-base lg:text-lg mb-[8px]',
              },
            }">
              <UInput type="text" :placeholder="translations['services.name_placeholder']" v-model="user.first_name" size="xl" :ui="{
                rounded: 'rounded-[8px]',
                padding: {
                  xl: 'px-6 py-4',
                },
                placeholder: 'placeholder-[#9A999B]',
                color: {
                  white: {
                    outline:
                      'shadow-none text-green-dark ring-1 ring-inset ring-white-222 focus:ring-2 focus:ring-primary-500',
                  },
                },
              }" class="w-full" />
            </UFormGroup>

            <UFormGroup :label="translations['services.surname_label']" name="last_name" :ui="{
              label: {
                base: 'block font-medium text-[#1D2825] text-base lg:text-lg mb-[8px]',
              },
            }">
              <UInput type="text" :placeholder="translations['services.surname_placeholder']" v-model="user.last_name" size="xl" :ui="{
                rounded: 'rounded-[8px]',
                padding: {
                  xl: 'px-[24px] py-[16px]',
                },
                placeholder: 'placeholder-[#9A999B]',
                color: {
                  white: {
                    outline:
                      'shadow-none text-green-dark ring-1 ring-inset ring-white-222 focus:ring-2 focus:ring-primary-500',
                  },
                },
              }" />
            </UFormGroup>

            <UFormGroup :label="translations['services.phone_label']" name="phone" :ui="{
              label: {
                base: 'block font-medium text-[#1D2825] text-base lg:text-lg mb-[8px]',
              },
            }">
              <ClientOnly>
                <UInput :placeholder="translations['services.phone_placeholder']" v-maska data-maska="+998 (##) ###-##-##"
                  v-model="user.phone" size="xl" :ui="{
                    rounded: 'rounded-[8px]',
                    padding: {
                      xl: 'px-[24px] py-[16px]',
                    },
                    placeholder: 'placeholder-[#9A999B]',
                    color: {
                      white: {
                        outline:
                          'shadow-none text-green-dark ring-1 ring-inset ring-white-222 focus:ring-2 focus:ring-primary-500',
                      },
                    },
                  }" />
              </ClientOnly>
            </UFormGroup>

            <UFormGroup :label="translations['services.mail_label']" name="email" :ui="{
              label: {
                base: 'block font-medium text-[#1D2825] text-base lg:text-lg mb-[8px]',
              },
            }">
              <UInput type="email" :placeholder="translations['services.mail_placeholder']" v-model="user.email" size="xl" :ui="{
                rounded: 'rounded-[8px]',
                padding: {
                  xl: 'px-[24px] py-[16px]',
                },
                placeholder: 'placeholder-[#9A999B]',
                color: {
                  white: {
                    outline:
                      'shadow-none text-green-dark ring-1 ring-inset ring-white-222 focus:ring-2 focus:ring-primary-500',
                  },
                },
              }" />
            </UFormGroup>
          </div>

          <UFormGroup :label="translations['services.topic_label']" name="topic" :ui="{
            label: {
              base: 'block font-medium text-[#1D2825] text-base lg:text-lg mb-[8px]',
            },
          }">
            <UInput type="text" :placeholder="translations['services.topic_placeholder']" v-model="user.topic" size="xl" :ui="{
              rounded: 'rounded-[8px]',
              padding: {
                xl: 'px-[24px] py-[16px]',
              },
              placeholder: 'placeholder-[#9A999B]',
              color: {
                white: {
                  outline:
                    'shadow-none text-green-dark ring-1 ring-inset ring-white-222 focus:ring-2 focus:ring-primary-500',
                },
              },
            }" />
          </UFormGroup>

          <UFormGroup :label="translations['services.message_label']" name="text" :ui="{
            label: {
              base: 'block font-medium text-[#1D2825] text-base lg:text-lg mb-[8px]',
            },
          }">
            <UTextarea v-model="user.text" :placeholder="translations['services.message_placeholder']" size="xl" :ui="{
              base: 'h-[152px]',
              rounded: 'rounded-[8px]',
              padding: {
                xl: 'px-[24px] py-[16px]',
              },
              placeholder: 'placeholder-[#9A999B]',
              color: {
                white: {
                  outline:
                    'shadow-none text-green-dark ring-1 ring-inset ring-white-222 focus:ring-2 focus:ring-primary-500',
                },
              },
            }" />
          </UFormGroup>

          <div class="flex flex-col gap-y-4 lg:flex-row lg:gap-y-0 justify-between items-start">
            <span class="text-[14px] lg:text-base">
              {{ translations['services.terms'] }}
            </span>

            <UButton :disabled="isDisabled" :loading="state.loading" size="xl" type="submit"
              class="w-full flex items-center lg:w-auto justify-center shadow-none bg-green font-medium px-[60px] hover:bg-[#4ADFAE] transition-all duration-200 ease-in-out">
              {{ translations['contact.confirm'] }}
            </UButton>
          </div>
        </div>
      </UForm>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['services.opinion_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useServices } from "~/stores/services";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());

useHead({
  title: () => `MPE.UZ | ${translations.value["header.my_opinion"]}`,
});

const page = usePage();

const state = reactive({
  errors: [],
  loading: false,
});

const user = reactive({
  last_name: "",
  first_name: "",
  phone: "",
  email: "",
  topic: "",
  text: "",
});

const selected = ref("opinion");
const methods = computed(() => [
  { value: "opinion", label: translations.value['services.opinion'] },
  { value: "appeal", label: translations.value['services.appeal'] },
]);

const isDisabled = computed(() => {
  return state.loading || validate().length > 0;
});

const validate = () => {
  const errors = [];
  if (!user.email) errors.push({ path: "email", message: translations.value['contact.can_not_blank'] });
  if (!user.last_name) errors.push({ path: "last_name", message: translations.value['contact.can_not_blank'] });
  if (!user.phone || user.phone.length < 19) errors.push({ path: "phone", message: user.phone.length < 19 && user.phone.length > 0 ? translations.value['contact.phone_full'] : translations.value['contact.can_not_blank'] });
  if (!user.first_name) errors.push({ path: "first_name", message: translations.value['contact.can_not_blank'] });
  if (!user.topic) errors.push({ path: "topic", message: translations.value['contact.can_not_blank'] });
  if (!user.text) errors.push({ path: "text", message: translations.value['contact.can_not_blank'] });

  return errors;
};

async function submitMessage() {
  state.loading = true;
  try {
    let res = await useServices().postServices("/opinion/save", {
      ...user,
      type: selected.value,
    });
    if (res.status === 201) {
      state.errors = [];
      user.last_name = "";
      user.first_name = "";
      user.phone = "";
      user.email = "";
      user.topic = "";
      user.text = "";
    } else {
      state.errors = [{ path: "form", message: "Something went wrong" }];
    }
  } catch {
    state.errors = [{ path: "form", message: "Something went wrong" }];
  } finally {
    state.loading = false;
  }
}
const emits = defineEmits(["isPostPage"]);

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.my_opinion"]);
});
</script>

<style lang="scss" scoped></style>
