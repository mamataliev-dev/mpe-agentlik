export default defineAppConfig({
  ui: {
    primary: "green",
    button: {
      base: "duration-200 ease-in-out",
    },
    breadcrumb: {
      li: 'text-sm gap-x-1.5 md:text-base md:gap-x-4 text-grey',
      base: 'font-normal',
      ol: 'gap-x-1.5 md:gap-x-4',
      inactive: 'text-grey duration-200 hover:text-primary',
      wrapper: 'max-w-full'
    }
  },
});
