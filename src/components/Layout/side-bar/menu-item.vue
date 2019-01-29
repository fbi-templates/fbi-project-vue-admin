<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
    },
    render (h, context) {
      const { icon, title, extra } = context.props
      const vnodes = []

      if (icon) {
        vnodes.push(<svg-icon icon-class={icon} />)
      }

      if (title) {
        vnodes.push(
          <span class="title">
            {title}
          </span>
        )
      }


      if (extra) {
        vnodes.push(
          <span class="extra">
            {extra}
          </span>
        )
      }

      return vnodes
    },
  }
</script>
