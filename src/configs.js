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
  sidebarLogo: true
}
