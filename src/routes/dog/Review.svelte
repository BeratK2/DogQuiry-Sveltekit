<script>
  import MetricGrid from "./MetricGrid.svelte";

    let dog = ""
</script>

<div class="header">
    <MetricGrid/>
   <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia n proident, sunt in culpa qui officia deserunt mollit anim id est laborum." deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat no
</p>
</div>

<style>
   .header{
       border-bottom: 4px solid rgba(83, 80, 80, 0.2);
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       padding-left: 100px;
       padding-right: 100px;
       padding-bottom: 10px;
   }
   h3{
       float: left;
   }
   input {
       float: right;
       height: 30px;
       margin-top: 10px;
       width: 200px;
       padding-left: 10px;
       border: 1px solid rgba(117, 117, 117, 0.5);
       border-radius: 50px;
       box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   }
   input:focus {
   outline: none;
   box-shadow: 0px 4px 4px rgba(255, 34, 34, 0.5);
   border: 1px solid rgba(255, 34, 34, 0.25);
 }
</style>