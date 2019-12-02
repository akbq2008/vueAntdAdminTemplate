<script>
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  render() {
    return <router-view />;
  }
};
</script>
