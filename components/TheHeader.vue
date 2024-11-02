<template>
  <transition name="fade">
    <div @click="isMenuOpen = false" v-if="isSearchFocused || isMenuOpen"
      class="w-screen min-h-screen fixed top-0 left-0 z-[18] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"></div>
  </transition>
  <div class="w-full relative z-[19]">
    <UModal v-model="isHeaderModalOpen" :ui="{
      width: 'sm:max-w-[1264px]',
      shadow: 'shadow-none',
      rounded: 'rounded-2xl',
    }">
      <UCard :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        rounded: 'rounded-2xl',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold leading-6 dark:text-white">
              {{ translations['header.phone_organizations'] }}
            </h3>
            <UButton color="gray" variant="soft" size="lg" :ui="{ rounded: 'rounded-full' }"
              icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isHeaderModalOpen = false" />
          </div>
        </template>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(phone, index) in phone_numbers" :key="index"
            class="border border-white-222 bg-white-111 rounded-2xl p-4">
            <h4 class="text-xl font-medium mb-4">{{ phone.title }}</h4>
            <UDivider class="border-white-111" />
            <p class="mt-4 mb-2 text-base">{{ translations['header.helpline_numbers'] }}:</p>
            <ULink v-for="tel in phone.phone" :key="tel.href" class="text-xl font-medium text-green block"
              :to="tel.href">{{
                tel.label }}</ULink>
          </div>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isPatriot" :ui="{
      width: patriotCurrent !== 'gerb' ? 'sm:max-w-[800px]' : 'sm:max-w-[700px]',
      shadow: 'shadow-none',
      rounded: 'rounded-2xl',
      container: 'items-center'
    }">
      <div class="p-4 md:p-8">
        <div class="flex justify-end">
          <UButton color="gray" variant="soft" size="lg" :ui="{ rounded: 'rounded-full' }"
            icon="i-heroicons-x-mark-20-solid" @click="isPatriot = false" />
        </div>
        <div class="w-full mt-4 md:mt-8">
          <img v-if="patriotCurrent === 'flag'" class="w-full rounded-2xl" src="~/assets/img/png/uz.png"
            alt="flag of uz">
          <img v-else-if="patriotCurrent === 'gerb'" class="w-full" src="~/assets/img/png/gerb.png" alt="gerb of uz">
          <div v-else>
            <p class="text-center">
              <strong class="text-lg">
                Mutal Burhonov musiqasi<br />
                Abdulla Oripov so’zi
              </strong> <br />
              <br />
              <i><strong>ʼʼ</strong> Serquyosh hur o’lkam, elga baxt, najot, <br />
                Sen o’zing do’stlarga yo’ldosh, mehribon! <br />
                Yashnagay to abad ilmu fan, ijod, <br />
                Shuhrating porlasin toki bor jahon! <br />
                <br />
                Oltin bu vodiylar – jon O’zbekiston,<br />
                Ajdodlar mardona ruhi senga yor!<br />
                Ulug’ xalq qudrati jo’sh urgan zamon,<br />
                Olamni mahliyo aylagan diyor!<br />
                <br />
                Bag’ri keng o’zbekning o’chmas iymoni,<br />
                Erkin, yosh avlodlar senga zo’r qanot!<br />
                Istiqlol mash’ali tinchlik posboni,<br />
                Xaqsevar, ona yurt, mangu bo’l obod!<br />
                <br />
                Oltin bu vodiylar – jon O’zbekiston,<br />
                Ajdodlar mardona ruhi senga yor!<br />
                Ulug’ xalq qudrati jo’sh urgan zamon,<br />
                Olamni mahliyo aylagan diyor! <strong>ʼʼ</strong></i><br />
            </p>
            <video class="w-full h-16 mt-6" controls autoplay name="media">
              <source src="~/assets/mp3/hymn.mp3" type="audio/mpeg">
            </video>
          </div>
        </div>
      </div>
    </UModal>
    <div class="bg-white-111">
      <div class="wrapper">
        <div class="py-0 sm:py-2 flex justify-between items-center">
          <ul class="flex gap-4 sm:gap-6">
            <li class="w-6 h-6 flex items-center justify-center">
              <ULink :to="staticData?.telegram" target="_blank"><img src="~/assets/img/icons/telegram.svg"
                  alt="telegram icon" /></ULink>
            </li>
            <li class="w-6 h-6 flex items-center justify-center">
              <ULink :to="staticData?.instagram" target="_blank"><img src="~/assets/img/icons/instagram.svg"
                  alt="telegram icon" /></ULink>
            </li>
            <li class="w-6 h-6 flex items-center justify-center">
              <ULink :to="staticData?.facebook" target="_blank"><img src="~/assets/img/icons/facebook.svg"
                  alt="telegram icon" /></ULink>
            </li>
          </ul>
          <div class="flex gap-3 sm:gap-4 items-center">
            <UButton @click="patriotTrigger('flag')" class="hidden xs:inline-flex text-green-dark hover:bg-transparent"
              variant="ghost">
              <template #leading>
                <img class="h-5 w-8 rounded-sm" src="~/assets/img/png/uz.png" alt="fleg uz">
              </template>
            </UButton>
            <UButton @click="patriotTrigger('gerb')" class="hidden xs:inline-flex text-green-dark hover:bg-transparent"
              variant="ghost">
              <template #leading>
                <img class="h-6 w-6" src="~/assets/img/png/gerb.png" alt="gerb uz">
              </template>
            </UButton>
            <UButton @click="patriotTrigger('madhiya')"
              class="hidden xs:inline-flex text-green-dark hover:bg-transparent" variant="ghost">
              <template #leading>
                <img class="w-6 h-6" src="~/assets/img/icons/sound.svg" alt="sound">
              </template>
            </UButton>
            <UButton :to="localePath('/sayt-xaritasi')" class="text-green-dark hover:bg-transparent" variant="ghost">
              <template #leading>
                <img class="w-6 h-6" src="~/assets/img/icons/list.svg" alt="list">
              </template>
            </UButton>
            <UDropdown class="z-[40]" :items="viewOfSite"
              :ui="{ background: 'white', rounded: 'rounded-xl', base: 'flex justify-center', item: { active: 'bg-transparent'} }"
              :popper="{ placement: 'bottom' }">
              <UButton class="text-green-dark hover:bg-transparent" variant="ghost">
                <template #leading>
                  <img src="~/assets/img/icons/eyes.svg" alt="eye">
                </template>
              </UButton>
              <template #starting="{ item }">
                <div class="flex flex-col gap-y-4">
                  <div>
                    <p class="text-green-dark text-start text-sm whitespace-nowrap mb-2">{{
                      translations['header.font_size'] }}</p>
                    <div class="flex gap-2 items-center">
                      <UButton @click="fontSize.click" v-for="fontSize in item.fontSizes" :key="fontSize.value"
                      :class="[fontSize.value, `hover:${fontSize.value}`]" variant="outline" label="A" />
                    </div>
                  </div>
                  <div>
                    
                      <p class="text-green-dark text-start text-sm whitespace-nowrap mb-2">{{
                      translations['header.appearance'] }}</p>
                    <div class="flex gap-2 items-center">
                      <UButton @click="blendMode.click" v-for="blendMode in item.mixBlendModes" :key="blendMode.value"
                      :class="[blendMode.value]" class="ring-white-222 bg-white-111 text-base" variant="solid" label="A" />
                    </div>
                  </div>
                </div>
              </template>
            </UDropdown>
            <span class="h-6 w-[1px] bg-white-222"></span>
            <UDropdown class="z-[40] hidden md:block" :items="items" :ui="{ background: 'white' }"
              :popper="{ placement: 'bottom' }">
              <UButton icon="i-heroicons-envelope" class="text-green-dark hover:bg-transparent" variant="ghost"
                label="devon@mpe.uz" trailing-icon="i-heroicons-chevron-down-20-solid" />
            </UDropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="wrapper hidden sm:block  py-4 border-b border-white-222">
        <div class="flex gap-4 items-center">
          <ULink class="w-40 hidden lg:block" :to="localePath('/')">
            <img src="~/assets/img/icons/logo_colored.svg" alt="logo" />
          </ULink>
          <div class="grow relative">
            <UForm :state="state" class="w-full" @submit="submitSearch(state.search)">
              <UFormGroup name="search">
                <UInput class="w-full z-[21]" v-model.trim="state.search" @focus="isSearchFocused = true"
                  @blur="isSearchFocused = false" autocomplete="off"
                  :ui="{ padding: { xl: 'px-6 py-4' }, rounded: 'rounded-xl', color: { white: { outline: 'shadow-none ring-white-222' } } }"
                  color="white" icon="i-heroicons-magnifying-glass-20-solid" size="xl" :trailing="true"
                  :placeholder="translations['header.search']" />
              </UFormGroup>
            </UForm>
            <transition name="fade-transform">
              <div v-if="isSearchFocused"
                class="absolute top-16 w-full z-[500] left-0 rounded-xl border border-white-222 py-4 bg-white shadow-lg">
                <div v-if="searchHistory.length > 0">
                  <p class="font-semibold text-xs text-grey-0 ml-5 uppercase">{{ translations['header.recent_searchs']
                    }}
                  </p>
                  <ul class="flex gap-2 flex-col mt-2">
                    <li class="px-2" v-for="searched in searchHistory" :key="searched">
                      <UButton @click="submitSearch(searched)" size="xl" variant="ghost"
                        class="text-green-dark rounded-lg w-full" :label="searched">
                      </UButton>
                    </li>
                  </ul>
                  <UDivider class="mt-4" :ui="{ border: { base: 'border-white-222' } }" />
                  <p class="font-semibold text-xs text-grey-0 ml-5 mt-4 uppercase">{{
                    translations['header.enlarged_searchs'] }}</p>
                  <ul class="flex gap-2 flex-col mt-4">
                    <li class="px-4" v-for="enlargedHistory in searchEnlargedHistory" :key="enlargedHistory.id">
                      <ULink :to="localePath(enlargedHistory.slug)"
                        class="grid grid-cols-10 group border border-white-222 rounded-xl overflow-hidden">
                        <div class="overflow-hidden col-span-3 h-[135px]">
                          <img class="object-cover h-full w-full group-hover:scale-110 duration-200"
                            :src="enlargedHistory.image" :alt="enlargedHistory.title">
                        </div>
                        <div class="col-span-7 p-4 flex flex-col justify-between">
                          <h4 class="text-base duration-200 group-hover:text-green font-medium text-black line-clamp-2">
                            {{ enlargedHistory.title }}</h4>
                          <div class="flex justify-between items-center mt-4">
                            <p class="flex gap-2 text-grey items-center">
                              <i class="i-heroicons-calendar text-lg"></i>{{ enlargedHistory.date }}
                            </p>
                            <p class="flex gap-1 text-grey items-center">
                              <i class="i-heroicons-eye text-lg"></i>{{ enlargedHistory.views }}
                            </p>
                          </div>
                        </div>
                      </ULink>
                    </li>
                  </ul>
                </div>
                <div v-else class="h-[400px] flex flex-col items-center justify-center">
                  <img src="~/assets/img/icons/search-not-found.svg" alt="Search history not found">
                  <div class="flex flex-col items-center mt-[13px] gap-y-[8px] px-4 sm:px-0">
                    <span class="text-center">Afsuski qidiruvlar topilmadi</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <UButton @click="isHeaderModalOpen = true" icon="i-heroicons-phone" size="xl"
            :ui="{ padding: { xl: 'py-4' }, rounded: 'rounded-xl' }"
            class="hidden lg:inline-flex text-green-dark hover:bg-transparent ring-white-222" variant="outline"
            label="+99871 207-04-07" trailing-icon="i-heroicons-chevron-down-20-solid" />
          <USelectMenu size="xl" class="w-[180px] hidden md:block"
            :ui="{ padding: { xl: 'py-4' }, leading: { padding: { xl: 'ps-14' } }, rounded: 'rounded-xl', color: { white: { outline: 'shadow-none ring-white-222' } } }"
            :uiMenu="{ option: { padding: 'px-4 py-4', size: 'text-md', avatar: { size: 'xs' } } }" v-model="selected"
            :options="langs">
            <template #leading>
              <UIcon v-if="selected.icon" :name="selected.icon" class="w-5 h-5" />
              <UAvatar v-else-if="selected.avatar" v-bind="selected.avatar" size="sm" />
            </template>
          </USelectMenu>
        </div>
      </div>
    </div>
  </div>
  <header id="header" class="bg-white duration-300 ease transition-all z-[18] sticky top-0 w-full">
    <div class="wrapper py-4 flex justify-between items-center relative">
      <transition name="fade-transform">
        <div v-if="isMenuOpen" id="menu"
          class="w-full xl:w-[600px] overflow-y-auto space-y-4 h-[calc(100vh-118px)] sm:h-auto sm:max-h-[calc(100vh-280px)] p-4 absolute left-0 top-20 sm:top-24 sm:rounded-xl bg-white shadow-lg">
          <div class="grow relative sm:hidden">
            <UForm class="w-full" :state="state" @submit="submitSearch(state.search)">
              <UFormGroup name="search">
                <UInput class="w-full z-[21]" v-model.trim="state.search" @focus="isSearchFocusedMobile = true"
                  @blur="isSearchFocusedMobile = false" autocomplete="off"
                  :ui="{ padding: { xl: 'px-6 py-4' }, rounded: 'rounded-xl', color: { white: { outline: 'shadow-none ring-white-222' } } }"
                  color="white" icon="i-heroicons-magnifying-glass-20-solid" size="xl" :trailing="true"
                  :placeholder="translations['header.search']" />
              </UFormGroup>
            </UForm>
            <transition name="fade-transform">
              <div v-if="isSearchFocusedMobile"
                class="absolute top-16 w-full z-[500] overflow-y-auto max-h-[calc(100vh-300px)] left-0 rounded-xl border border-white-222 py-4 bg-white shadow-lg">
                <div v-if="searchHistory.length > 0">
                  <p class="font-semibold text-xs text-grey-0 ml-5 uppercase">{{ translations['header.recent_searchs']
                    }}
                  </p>
                  <ul class="flex gap-2 flex-col mt-2">
                    <li class="px-2" v-for="searched in searchHistory" :key="searched">
                      <UButton @click="submitSearch(searched)" size="xl" variant="ghost"
                        class="text-green-dark rounded-lg w-full text-sm" :label="searched">
                      </UButton>
                    </li>
                  </ul>
                  <UDivider class="mt-4" :ui="{ border: { base: 'border-white-222' } }" />
                  <p class="font-semibold text-xs text-grey-0 ml-5 mt-4 uppercase">{{
                    translations['header.enlarged_searchs'] }}</p>
                  <ul class="flex gap-2 flex-col mt-4">
                    <li class="px-4" v-for="enlargedHistory in searchEnlargedHistory" :key="enlargedHistory.id">
                      <TheCard :link="enlargedHistory.slug" :image="enlargedHistory.image"
                        :title="enlargedHistory.title" :views="enlargedHistory.views" :date="enlargedHistory.date" />
                    </li>
                  </ul>
                </div>
                <div v-else class="h-[400px] flex flex-col items-center justify-center">
                  <img src="~/assets/img/icons/search-not-found.svg" alt="Search history not found">

                  <div class="flex flex-col items-center mt-[13px] gap-y-[8px] px-4 sm:px-0">
                    <span class="text-center">Afsuski qidiruvlar topilmadi</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <UButton @click="isHeaderModalOpen = true" block icon="i-heroicons-phone" size="xl"
            :ui="{ padding: { xl: 'py-4' }, rounded: 'rounded-xl', icon: { base: 'last:ml-auto' } }"
            class="lg:hidden  text-green-dark hover:bg-transparent ring-white-222" variant="outline"
            label="+99871 207-04-07" trailing-icon="i-heroicons-chevron-down-20-solid" />
          <UAccordion color="black" variant="ghost" size="xl" :items="navLinks">
            <template #item="{ item }">
              <nav>
                <ul class="ml-6 space-y-6">
                  <li v-for="link in item.links[0]" :key="link.to">
                    <ULink @click="isMenuOpen = false" class="hover:text-green duration-200" :to="link.to">{{ link.label
                      }}</ULink>
                  </li>
                </ul>
              </nav>
            </template>
          </UAccordion>
          <USelectMenu size="xl" class=" md:hidden"
            :ui="{ padding: { xl: 'py-4' }, leading: { padding: { xl: 'ps-14' } }, rounded: 'rounded-xl', color: { white: { outline: 'shadow-none ring-white-222' } } }"
            :uiMenu="{ option: { padding: 'px-4 py-4', size: 'text-md', avatar: { size: 'xs' } } }" v-model="selected"
            :options="langs">
            <template #leading>
              <UIcon v-if="selected.icon" :name="selected.icon" class="w-5 h-5" />
              <UAvatar v-else-if="selected.avatar" v-bind="selected.avatar" size="sm" />
            </template>
          </USelectMenu>
        </div>
      </transition>
      <ULink class="w-40 block lg:hidden" :to="localePath('/')">
        <img src="~/assets/img/icons/logo_colored.svg" alt="logo" />
      </ULink>
      <UButton @click="isMenuOpen = !isMenuOpen" size="xl"
        :ui="{ padding: { xl: 'px-2 sm:px-4 py-3 sm:py-4' }, rounded: 'rounded-xl' }"
        class="text-green ring-gray-300 sm:text-md text-sm" variant="soft" :label="translations['header.open_menu']">
        <template #trailing>
          <label class="hamburger select-none pointer-events-none">
            <input v-model="isMenuOpen" type="checkbox">
            <svg viewBox="0 0 32 32">
              <path class="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
              </path>
              <path class="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </template>
      </UButton>
      <nav class="xl:flex gap-4 hidden">
        <UDropdown :items="nav.links" v-for="nav in navLinks" :key="nav" :ui="{
          background: 'white',
          width: 'w-64',
          item: { padding: 'py-3 px-4', size: 'text-sm' },
          arrow: { base: 'before:w-6 before:h-6' },
        }" :popper="{ placement: 'bottom', arrow: true }">
          <UButton size="xl" class="text-green-dark hover:bg-transparent text-sm 2xl:text-base" variant="ghost"
            :label="nav.label" trailing-icon="i-heroicons-chevron-down-20-solid" />
          <template #item="{ item }">
            <span>{{ item.label }}</span>
          </template>
        </UDropdown>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useHeader } from "~/stores/header";
import { useSearch } from "~/stores/search";
import { useStatic } from '~/stores/static';
import { useTranslation } from '~/stores/translations';

const { data } = await useAsyncData('header', () => useHeader().getHeader('/header'));

const { staticData } = useStatic();
const { interactive_services } = storeToRefs(useServices());
const { translations } = storeToRefs(useTranslation());
const { setLocale, locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath()

const router = useRouter();
const route = useRoute();
const searchStore = useSearch();

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    isHeaderModalOpen.value = false;
    isMenuOpen.value = false;
    isSearchFocused.value = false;
    isSearchFocusedMobile.value = false;
    state.search = route.query?.search || "";
  }
);

const viewOfSite = [[
  {
    slot: 'starting',
    fontSizes: [
      { value: "text-sm", click: () => { document.documentElement.classList.remove('font_size--base', 'font_size--lg', 'font_size--xl') } },
      {
        value: "text-base", click: () => {
          document.documentElement.classList.add('font_size--base');
          document.documentElement.classList.remove('font_size--lg', 'font_size--xl');
        }
      },
      {
        value: "text-lg", click: () => {
          document.documentElement.classList.add('font_size--lg');
          document.documentElement.classList.remove('font_size--base', 'font_size--xl');
        }
      },
      {
        value: "text-xl", click: () => {
          document.documentElement.classList.add('font_size--xl');
          document.documentElement.classList.remove('font_size--base', 'font_size--lg');
        }
      }
    ],
    mixBlendModes: [
      { value: "!bg-green", click: () => { document.documentElement.style.mixBlendMode = 'normal' } },
      { value: "!bg-grey-0", click: () => { document.documentElement.style.mixBlendMode = 'luminosity' } },
      { value: "!bg-green-dark", click: () => { document.documentElement.style.mixBlendMode = 'exclusion' } }
    ]
  }

]]


const items = [
  [
    {
      label: "devon@mpe.uz",
      href: "mailto:devon@mpe.uz",
      icon: 'i-heroicons-envelope'
    },
    {
      label: "mdo@exat.uz",
      href: "mailto:mdo@exat.uz",
      icon: 'i-heroicons-envelope'
    },
  ],
];

const langs = [
  {
    id: "uz",
    label: "O'zbek",
    avatar: { src: "/assets/icons/uz.svg" }
  },
  {
    id: "ru",
    label: "Русский",
    avatar: { src: "/assets/icons/ru.svg" }
  },
  {
    id: "en",
    label: "English",
    avatar: { src: "/assets/icons/gb.svg" }
  },
];

const navLinks = computed(() => [
  {
    label: translations.value['header.agency'],
    links: [
      [
        { label: translations.value['header.about_agency'], to: localePath("/agentlik/agentlik-haqida") },
        { label: translations.value['header.leadership'], to: localePath("/agentlik/rahbariyat") },
        { label: translations.value['header.central_apparatus'], to: localePath("/agentlik/markaziy-apparat") },
        { label: translations.value['header.regional_administrations'], to: localePath("/agentlik/hududiy-boshqarmalar") },
        {
          label: translations.value['header.community_council'],
          to: localePath("/agentlik/jamoatchilik-kengashi"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.regulatory_documents'],
    links: [
      [
        { label: translations.value['header.everything'], to: localePath("/meyoriy-hujjatlar/barchasi") },
        ...data.value?.document_categories.map((item) => ({
          label: item.title,
          to: localePath(`/meyoriy-hujjatlar/${item.slug}`),
        })),
      ],
    ],
  },
  {
    label: translations.value['header.activity'],
    links: [
      [
        ...data.value?.activity_categories.map((item) => ({
          label: item.title,
          to: localePath(`/faoliyat/${item.slug}`),
        })),
        { label: translations.value['header.reports'], to: localePath("/faoliyat/hisobotlar") },
        { label: translations.value['header.vacancies'], to: localePath("/faoliyat/bosh-ish-orinlari") },
        {
          label: translations.value['header.investment_potential'],
          to: localePath("/faoliyat/investitsiya-salohiyati"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.education'],
    links: [
      [
        ...data.value?.education_categories.map((item) => ({
          label: item.title,
          to: localePath(`/talim-va-tarbiya/${item.slug}`),
        })),
        {
          label: translations.value['header.e_library'],
          to: localePath("/talim-va-tarbiya/elektron-kutubxona"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.press_service'],
    links: [
      [
        { label: translations.value['header.everything'], to: localePath("/matbuot-xizmati/barchasi") },
        ...data.value?.news_categories.map((item) => ({
          label: item.title,
          to: localePath(`/matbuot-xizmati/${item.slug}`),
        })),
      ],
    ],
  },
  {
    label: translations.value['header.open_data'],
    links: [
      [
        { label: translations.value['header.everything'], to: localePath("/ochiq-malumotlar/barchasi") },
        ...data.value?.open_source_categories.map((item) => ({
          label: item.title,
          to: localePath(`/ochiq-malumotlar/${item.slug}`),
        })),
        {
          label: translations.value['header.online_streaming'],
          to: localePath("/ochiq-malumotlar/onlayn-translyatsiya"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.services'],
    links: [
      [
        ...interactive_services.value?.results.map((item) => ({
          label: item.title,
          to: localePath(item.url),
        })),
        { label: translations.value['header.appeals'], to: localePath("/xizmatlar/murojaatlar") },
        {
          label: translations.value['header.faq'],
          to: localePath("/xizmatlar/kop-beriladigan-savollar"),
        },
        { label: translations.value['header.my_opinion'], to: localePath("/xizmatlar/mening-fikrim") },
        { label: translations.value['header.map'], to: localePath("/xizmatlar/mttlar-xaritasi") },
      ],
    ],
  },
]);

const phone_numbers = [
  {
    title: "“Uzbekistan Airways” AJ",
    phone: [{ label: "+998 (78) 140-02-00", href: "tel:+998781400200" }],
  },
  {
    title: "“O‘zbekiston temir yo‘llari” AJ",
    phone: [{ label: "+998 (78) 140-02-00", href: "tel:+998781400200" }],
  },
  {
    title: "“Uzbekistan Airports” AJ",
    phone: [{ label: "+998 (78) 140-02-00", href: "tel:+998781400200" }],
  },
  {
    title: "“Uzbekistan Airports” AJ",
    phone: [
      { label: "+998 (78) 140-02-00", href: "tel:+998781400200" },
      { label: "+998 (78) 140-02-00", href: "tel:+998781400200" },
    ],
  },
  {
    title: "“O‘zbekiston temir yo‘llari” AJ",
    phone: [
      { label: "+998 (78) 140-02-00", href: "tel:+998781400200" },
      { label: "+998 (78) 140-02-00", href: "tel:+998781400200" },
    ],
  },
  {
    title: "“Uzbekistan Airways” AJ",
    phone: [{ label: "1062", href: "tel:1062" }],
  },
];

// variables
const isHeaderModalOpen = ref(false);
const selected = ref(langs.find((lang) => lang.id === useI18n().locale.value));
const isSearchFocused = ref(false);
const isSearchFocusedMobile = ref(false);
const isMenuOpen = ref(false);
const isPatriot = ref(false);
const patriotCurrent = ref(null);

const state = reactive({
  search: route.query?.search || "",
});
const searchHistory = ref(null);

const searchEnlargedHistory = ref([]);

const { enlargedSearch } = storeToRefs(searchStore);

if (process.client) {
  if (!localStorage.getItem('searchHistory')) {
    localStorage.setItem('searchHistory', JSON.stringify([]));
  }
  searchEnlargedHistory.value = JSON.parse(localStorage.getItem('searchEnlargedHistory'));
  searchHistory.value = JSON.parse(localStorage.getItem('searchHistory'));
  if (searchHistory.value.length > 4) {
    searchHistory.value = searchHistory.value.slice(0, 4);
  }
}

// watcher
watch(isMenuOpen, (value) => {
  if (value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

watch(isSearchFocused, (value) => {
  if (value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

watch(isSearchFocusedMobile, (value) => {
  if (value) {
    document.querySelector("#menu").style.overflow = "hidden";
  } else {
    document.querySelector("#menu").style.overflow = "auto";
  }
});

watch(selected, (value) => {
  navigateTo(switchLocalePath(value.id));
  // setLocale(value.id);
});

watch(locale, async () => {
  data.value = await useHeader().getHeader('/header');
  selected.value = langs.find(lang => lang.id === route.path.split("/")[1]) || langs[0];
})

watch(enlargedSearch, (value) => {
  searchEnlargedHistory.value = value;
});

// eventListeners
onMounted(() => {
  const header = document.querySelector("#header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 137) {
      isSearchFocused.value = false;
      header.classList.add("shadow-lg");
    } else if (window.scrollY <= 137) {
      header.classList.remove("shadow-lg");
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {
    if (window.scrollY > 137) {
      isSearchFocused.value = false;
      header.classList.add("shadow-lg");
    } else if (window.scrollY <= 137) {
      header.classList.remove("shadow-lg");
    }
  });
});

// methods
const submitSearch = (searched = "") => {
  if (searched === "") return;
  router.push({
    path: localePath('/qidirish'),
    query: {
      search: searched
    }
  });
  searchHistory.value = [searched, ...searchHistory.value];
  searchHistory.value = searchHistory.value.filter((item, index) => searchHistory.value.indexOf(item) === index);
  if (searchHistory.value.length > 4) {
    searchHistory.value = searchHistory.value.slice(0, 4);
  }
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
  state.search = '';
  isSearchFocusedMobile.value = false;
  isSearchFocused.value = false;
}

const patriotTrigger = (type) => {
  isPatriot.value = true;
  patriotCurrent.value = type;
}
</script>
<style>
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-transform-enter-to,
.fade-transform-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.hamburger {
  cursor: pointer;
}

.hamburger input {
  display: none;
}

.hamburger svg {
  /* The size of the SVG defines the overall size */
  height: 1.5em;
  /* Define the transition for transforming the SVG */
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger .line {
  fill: none;
  stroke: #11BE86;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  /* Define the transition for transforming the Stroke */
  transition: stroke-dasharray 300ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger .line-top-bottom {
  stroke-dasharray: 12 63;
}

.hamburger input:checked+svg {
  transform: rotate(-45deg);
}

.hamburger input:checked+svg .line-top-bottom {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}
</style>
