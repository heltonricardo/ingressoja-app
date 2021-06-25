<script>
  import Spinner from "./Spinner.svelte";
</script>

<style>
  #modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.25);
    z-index: 10;
    transition: 0.1s;
  }

  #spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div id="modal-backdrop">
  <div id="spinner">
    <Spinner />
  </div>
</div>
