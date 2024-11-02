<template>
  <footer class="bg-[#19201E] text-white-default relative">
    <div class="wrapper">
      <div class="grid grid-cols-1 pt-16 pb-24 lg:grid-cols-4 lg:py-40">
        <!-- Logo / Social Media -->
        <div class="flex justify-between gap-y-10 lg:gap-y-5 lg:flex-col lg:justify-normal">
          <ULink :to="localePath('/')">
            <img class="w-[119px] h-[44px] md:w-[148px] md:h-[56px]" src="@/assets/img/icons/logo_colorless.svg"
              alt="MPE.UZ" />
          </ULink>

          <div class="flex gap-x-[8px]">
            <ULink target="_blank" :to="staticData.telegram">
              <img class="social-media" src="@/assets/img/icons/footer-telegram.svg" alt="Telegram" />
            </ULink>
            <ULink target="_blank" :to="staticData.instagram">
              <img class="social-media" src="@/assets/img/icons/footer-instagram.svg" alt="Instagram" />
            </ULink>
            <ULink target="_blank" :to="staticData.facebook">
              <img class="social-media" src="@/assets/img/icons/footer-facebook.svg" alt="Facebook" />
            </ULink>
          </div>
        </div>

        <!-- Links -->
        <ul class="flex flex-col gap-y-6 mt-8 mb-10 lg:mt-0 lg:mb-0 text-white">
          <li class="text-[1rem]">
            <NuxtLink :to="translations['footerLinks.first_link']">{{ translations['footerLinks.first_title'] }}</NuxtLink>
          </li>

          <li class="text-[1rem]">
            <NuxtLink :to="translations['footerLinks.second_link']">{{ translations['footerLinks.second_title'] }}</NuxtLink>
          </li>

          <li class="text-[1rem]">
            <NuxtLink :to="translations['footerLinks.third_link']">{{ translations['footerLinks.third_title'] }}</NuxtLink>
          </li>

          <li class="text-[1rem]">
            <NuxtLink :to="translations['footerLinks.forth_link']">{{ translations['footerLinks.forth_title'] }}</NuxtLink>
          </li>

          <li class="text-[1rem]">
            <NuxtLink :to="translations['footerLinks.fifth_link']">{{ translations['footerLinks.fifth_title'] }}</NuxtLink>
          </li>

          <li class="text-[1rem]">
            <NuxtLink :to="localePath('/sayt-xaritasi')">{{ translations['footer.site_map'] }}</NuxtLink>
          </li>

          <li class="text-[1rem]">
            <NuxtLink :to="localePath('/boglanish')">{{ translations['footer.contact'] }}</NuxtLink>
          </li>
        </ul>

        <!-- Contacts -->
        <ul class="flex flex-col gap-y-6 text-white z-[100]">
          <div class="flex items-center gap-x-6 lg:flex-col lg:items-start lg:gap-y-6">
            <li class="contact-item">
              <div class="contact-item-label">
                <img src="@/assets/img/icons/call.svg" alt="Call" />
                <span class="contact-item-label__text">{{ translations['footer.hotlines'] }}:</span>
              </div>

              <a href="tel:+99871-207-04-07" class="contact-item__link">+998 71 207-04-07</a>
            </li>

            <li class="contact-item">
              <div class="contact-item-label">
                <img src="@/assets/img/icons/call.svg" alt="Call" />
                <span class="contact-item-label__text">{{ translations['footer.agency'] }}:</span>
              </div>

              <a href="tel:+99871-207-04-08" class="contact-item__link">+998 71 207-04-08</a>
            </li>
          </div>

          <li class="contact-item">
            <div class="contact-item-label">
              <img src="@/assets/img/icons/user.svg" alt="User" />
              <span class="contact-item-label__text">{{ translations['footer.press_service_officer'] }}:</span>
            </div>

            <span class="contact-item__link">Botir Akmal Mirzayev</span>
            <a href="tel:+99899-972-32-26" class="contact-item__link">+998 99 972 32 26</a>
          </li>
        </ul>

        <!-- Location -->
        <div class="flex flex-col gap-y-[8px] mt-6 lg:mt-0 text-white z-[4]">
          <div class="contact-item-label">
            <img class="w-4 h-4" src="@/assets/img/icons/location.svg" alt="Location" />
            <span class="contact-item-label__text">{{ translations['footer.address'] }}:</span>
          </div>

          <span class="contact-item__link">
            {{ staticData.adres }}
          </span>

          <ULink :to="localePath('/xizmatlar/mttlar-xaritasi')" class="flex items-center gap-x-[8px]">
            <span class="text-green"> {{ translations['footer.view_on_map'] }}</span>
            <i class="i-heroicons-arrow-long-right text-green"></i>
          </ULink>
        </div>
      </div>

      <div class="flex flex-col gap-y-4 lg:flex-row lg:justify-between py-24 border-t border-[#33443E] text-white">
        <span class="text-[12px] lg:text-[14px]">{{ translations['footer.all_rights_reserved'] }}</span>

        <span class="text-[12px] lg:text-[14px]">{{ translations['footer.license'] }}</span>
      </div>
    </div>

    <!-- Footer Bg -->
    <div class="hidden lg:block footer-bg absolute bottom-[70px] lg:bottom-[90px] xl:bottom-[70px] right-0">
      <svg width="558" height="380" viewBox="0 0 558 380" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g style="mix-blend-mode: soft-light" opacity="0.6">
          <ellipse cx="215.132" cy="296.871" rx="215.132" ry="296.871"
            transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 717.01 207.801)"
            fill="url(#paint0_linear_2016_5087)" fill-opacity="0.7" />
          <path
            d="M225.537 383.454C204.368 462.458 208.421 540.162 232.038 601.913C255.656 663.665 298.8 709.392 355.796 724.664C412.792 739.937 473.02 721.908 524.349 680.237C575.678 638.568 618.039 573.301 639.208 494.297C660.377 415.293 656.324 337.589 632.708 275.838C609.09 214.086 565.946 168.359 508.95 153.087C451.954 137.815 391.726 155.843 340.396 197.514C289.068 239.183 246.707 304.45 225.537 383.454Z"
            stroke="url(#paint1_linear_2016_5087)" stroke-opacity="0.24" stroke-width="2" />
        </g>
        <g style="mix-blend-mode: soft-light" opacity="0.6">
          <ellipse cx="201.57" cy="296.907" rx="201.57" ry="296.907"
            transform="matrix(-0.866025 -0.5 -0.5 0.866025 760.906 304.783)" fill="url(#paint2_linear_2016_5087)"
            fill-opacity="0.7" />
          <path
            d="M264.189 360.842C223.282 431.696 205.768 507.062 210.477 571.606C215.186 636.158 242.102 689.774 289.935 717.39C337.767 745.006 397.658 741.508 455.916 713.311C514.168 685.116 570.679 632.266 611.587 561.412C652.494 490.558 670.008 415.193 665.299 350.648C660.59 286.097 633.674 232.48 585.842 204.864C538.009 177.248 478.118 180.747 419.86 208.944C361.608 237.138 305.097 289.988 264.189 360.842Z"
            stroke="url(#paint3_linear_2016_5087)" stroke-opacity="0.24" stroke-width="2" />
        </g>
        <g style="mix-blend-mode: soft-light">
          <ellipse cx="206.887" cy="296.871" rx="206.887" ry="296.871"
            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 825.217 432.703)"
            fill="url(#paint4_linear_2016_5087)" fill-opacity="0.7" />
          <path
            d="M323.422 350.747C265.581 408.588 229.586 477.262 218.112 541.498C206.637 605.739 219.692 665.441 259.794 705.543C299.896 745.645 359.598 758.7 423.839 747.225C488.075 735.751 556.75 699.756 614.591 641.915C672.431 584.074 708.427 515.4 719.901 451.163C731.376 386.923 718.32 327.221 678.218 287.119C638.117 247.017 578.414 233.961 514.174 245.436C449.937 256.911 381.263 292.906 323.422 350.747Z"
            stroke="url(#paint5_linear_2016_5087)" stroke-opacity="0.24" stroke-width="2" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_2016_5087" x1="215.132" y1="0" x2="215.132" y2="593.741"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_2016_5087" x1="509.209" y1="152.121" x2="355.537" y2="725.63"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint2_linear_2016_5087" x1="201.57" y1="0" x2="201.57" y2="593.814"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint3_linear_2016_5087" x1="586.342" y1="203.998" x2="289.435" y2="718.256"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint4_linear_2016_5087" x1="206.887" y1="0" x2="206.887" y2="593.741"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint5_linear_2016_5087" x1="678.925" y1="286.412" x2="259.087" y2="706.25"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </footer>
</template>

<script setup>
import { useStatic } from '~/stores/static';
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { staticData } = useStatic();
const localePath = useLocalePath();

</script>

<style lang="scss" scoped>
.social-media {
  @apply w-11 h-11 lg:h-11 lg:w-11 xl:w-14 xl:h-14 cursor-pointer;
}

.contact-item {
  @apply flex flex-col gap-y-[8px];

  &-label {
    @apply flex items-center gap-x-[8px];

    &__text {
      @apply text-white-222 text-[14px] lg:text-[1rem];
    }
  }

  &__link {
    @apply text-[1rem] lg:text-[18px] font-medium;
  }
}
</style>
