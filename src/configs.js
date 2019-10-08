export default {
  authTokenKey: 'token',

  /**
   * @type {string}
   * @description site title
   */
  title: SITE_TITLE || '',

  /**
   * @type {string}
   * @description site logo
   */
  logo: SITE_LOGO || '',

  /**
   * @type {string}
   * @description home route name
   */
  homeRouteName: 'dashboard',

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {number}
   * @description Large screen minimum width
   */
  largeScreenMinWidth: 1680,

  /**
   * @type {string} mini/small/medium
   * @description Default size of UI components
   */
  UIDefaultSize: 'mini',

  /**
   * @type {string} zh/en
   * @description Default language
   */
  UIDefaultLanguage: 'zh'
}
